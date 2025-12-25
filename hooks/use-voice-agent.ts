"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface VoiceAgentConfig {
  onTranscript?: (text: string) => void;
  onResponse?: (text: string) => void;
  onError?: (error: Error) => void;
}

export function useVoiceAgent(config?: VoiceAgentConfig) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setIsProcessing(false);
      
      // Get microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        } 
      });
      mediaStreamRef.current = stream;

      // Create audio context for silence detection
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Create MediaRecorder for audio capture
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          await processAudioWithDeepgram(audioBlob);
        } catch (err) {
          const error = err instanceof Error ? err : new Error("Failed to process audio");
          setError(error.message);
          config?.onError?.(error);
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorder.start();
      setIsListening(true);

      // Start silence detection
      detectSilence(analyser, mediaRecorder);

    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to access microphone");
      setError(error.message);
      config?.onError?.(error);
      setIsListening(false);
    }
  }, [config]);

  const detectSilence = useCallback((analyser: AnalyserNode, mediaRecorder: MediaRecorder) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const SILENCE_THRESHOLD = 5; // Adjust this value (0-255) for sensitivity
    const SILENCE_DURATION = 1500; // Time in ms to wait before considering speech ended
    let silenceStart = Date.now();
    let isSpeaking = false;

    const checkAudioLevel = () => {
      if (!analyserRef.current || mediaRecorder.state !== 'recording') {
        return;
      }

      analyser.getByteTimeDomainData(dataArray);

      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const value = Math.abs(dataArray[i] - 128);
        sum += value;
      }
      const average = sum / bufferLength;

      if (average > SILENCE_THRESHOLD) {
        // User is speaking
        isSpeaking = true;
        silenceStart = Date.now();
        
        // Clear any existing silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      } else if (isSpeaking) {
        // Silence detected after speaking
        const silenceDuration = Date.now() - silenceStart;
        
        if (silenceDuration > SILENCE_DURATION && !silenceTimeoutRef.current) {
          // User stopped speaking, process the audio
          console.log("Silence detected, processing audio...");
          
          // Stop recording and process
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsListening(false);
            setIsProcessing(true);
          }
          
          // Cancel animation frame
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          return;
        }
      }

      // Continue checking
      animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
    };

    checkAudioLevel();
  }, []);

  const processAudioWithDeepgram = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // Get API key
      const configResponse = await fetch('/api/voice-agent');
      if (!configResponse.ok) {
        throw new Error("Failed to get API configuration");
      }
      const { apiKey } = await configResponse.json();

      // Transcribe with Deepgram - detect multiple languages
      const transcribeResponse = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&detect_language=true', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'audio/webm',
        },
        body: audioBlob,
      });

      if (!transcribeResponse.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const transcribeData = await transcribeResponse.json();
      const transcriptText = transcribeData.results?.channels[0]?.alternatives[0]?.transcript || "";
      const detectedLanguage = transcribeData.results?.channels[0]?.detected_language || "en";
      
      if (!transcriptText) {
        throw new Error("No speech detected");
      }

      setTranscript(transcriptText);
      config?.onTranscript?.(transcriptText);

      // Detect if Hindi is being spoken (check for Hindi characters or detected language)
      const isHindi = detectedLanguage === "hi" || /[\u0900-\u097F]/.test(transcriptText);

      // Generate response based on detected language
      const responseText = isHindi ? generateResponseHindi(transcriptText) : generateResponse(transcriptText);
      setResponse(responseText);
      config?.onResponse?.(responseText);

      // Generate and play audio response in the detected language
      await generateAndPlaySpeech(responseText, apiKey, isHindi);

      // Automatically restart listening after response is played
      setTimeout(() => {
        if (!isListening) {
          startListening();
        }
      }, 500);

    } catch (err) {
      throw err;
    }
  };

  const generateResponse = (transcript: string): string => {
    const lower = transcript.toLowerCase();
    
    // Greetings
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      return "Hello! Welcome to Gyan Rich. We are an educational platform that empowers students and institutions through innovative solutions. How can I help you today?";
    }
    
    // About company
    if (lower.includes("about") || lower.includes("who are you") || lower.includes("what is gyan rich")) {
      return "Gyan Rich is an educational platform that bridges the gap between aspirations and achievements. We began with a vision to make learning meaningful and personal for every student. We provide expert counselling sessions, interactive video lectures, and customized digital platforms for schools. Our mission is to empower institutions to go beyond textbooks, helping students discover their potential and making learning an inspiring journey for all.";
    }
    
    // Services - General
    if (lower.includes("service") && !lower.includes("counselling") && !lower.includes("video") && !lower.includes("website")) {
      return "We offer four core services: First, Expert Counselling Sessions with personalized career guidance and emotional wellness support. Second, Pre-Recorded Video Lectures for classes 9 to 12 by subject matter experts. Third, Custom School Websites with responsive design and one year free hosting. And fourth, Extra Consulting Services including curriculum development and staff training. We have counselled over 500 students, delivered 300 plus hours of content, and served more than 10 institutions.";
    }
    
    // Counselling Services
    if (lower.includes("counselling") || lower.includes("counseling") || lower.includes("career guidance")) {
      return "Our Expert Counselling Sessions include personalized career guidance based on interests and strengths, certified experienced counselors, emotional wellness support to reduce stress and anxiety, mindset and confidence building programs, and goal-oriented roadmaps for academic and competitive exam growth. We also provide parent counseling support. We have successfully counselled over 500 students.";
    }
    
    // Video Lectures
    if (lower.includes("video") || lower.includes("lecture") || lower.includes("recorded") || lower.includes("class")) {
      return "We provide Pre-Recorded Video Lectures for classes 9 to 12 across various subjects. Our features include high quality recorded lectures on demand, specific subject matter experts, Q and A sessions, and study materials included. Students can learn at their own pace with lifetime access to recordings. We have over 300 hours of educational content available.";
    }
    
    // Website Development
    if (lower.includes("website") || lower.includes("web design") || lower.includes("online presence")) {
      return "We create Custom School Websites with professional, responsive design tailored specifically for educational institutions. Our websites include one year free hosting and maintenance, SEO optimization for better online presence, school portfolio showcase, and news and updates sections. We have delivered websites for over 10 institutions. This helps schools achieve a modern professional appearance and enhanced online presence.";
    }
    
    // Consulting Services
    if (lower.includes("consulting") || lower.includes("training") || lower.includes("curriculum")) {
      return "Our Extra Consulting Services provide strategic guidance for educational institutions. This includes curriculum development, technology integration, staff training programs, quality assurance, and performance analytics. These services help institutions improve their performance, adopt modern teaching methodologies, and gain competitive advantage through data-driven decision making.";
    }
    
    // Pricing - General
    if (lower.includes("pricing") || lower.includes("price") || lower.includes("cost") || lower.includes("package")) {
      return "We offer three packages. Basic package at rupees 17,999 for 3 months includes monthly career counselling, workshops on career guidance and AI coding, and an IQ test. Advanced package at rupees 34,999 for 3 months includes all basic features plus an extra IQ test, school function recording, and portfolio building. Premium package at rupees 59,999 for 3 months includes all advanced features plus custom pre-recorded lectures by your campus teachers for classes 9 to 12, custom website building, and priority support. Which package would you like to know more about?";
    }
    
    // Basic Package
    if (lower.includes("basic") && (lower.includes("package") || lower.includes("plan"))) {
      return "Our Basic package costs rupees 17,999 for 3 months and is perfect for small schools getting started. It includes one career counselling session each month, one workshop on career guidance, one IQ aptitude test for enhancing students' knowledge, and one workshop on AI and coding.";
    }
    
    // Advanced Package
    if (lower.includes("advanced") && (lower.includes("package") || lower.includes("plan"))) {
      return "Our Advanced package costs rupees 34,999 for 3 months and is ideal for schools aiming for growth. It includes all Basic package features, plus one extra IQ aptitude test, recording of any one school function, and portfolio building for your school.";
    }
    
    // Premium Package
    if (lower.includes("premium") && (lower.includes("package") || lower.includes("plan"))) {
      return "Our Premium package costs rupees 59,999 for 3 months and is ideal for schools who want to grow fast. It includes all Advanced features, plus your own campus teachers' pre-recorded lectures for classes 9 to 12 in specific subjects, custom website building to increase trust and brand value, and priority support for academic growth.";
    }
    
    // Mission, Vision, Values
    if (lower.includes("mission")) {
      return "Our mission is to empower students and institutions through innovative educational solutions and expert guidance, going beyond textbooks to help students discover their potential.";
    }
    
    if (lower.includes("vision")) {
      return "Our vision is to be the leading educational platform that bridges the gap between aspirations and achievements, transforming the way students learn and grow.";
    }
    
    if (lower.includes("values")) {
      return "Our core values are excellence, integrity, innovation, and a commitment to transforming students through education. We focus on making learning meaningful and personal for every student.";
    }
    
    // Contact
    if (lower.includes("contact") || lower.includes("reach") || lower.includes("call") || lower.includes("email")) {
      return "You can reach us through our contact form at forms.office.com or by clicking 'Get Started' button on our website. We also have a 'Start Your Journey' option on our homepage. Our team will be happy to assist you with any questions.";
    }
    
    // Achievements/Stats
    if (lower.includes("achievement") || lower.includes("experience") || lower.includes("success")) {
      return "We have achieved significant milestones: counselled over 500 students, created more than 300 hours of educational content, delivered websites for over 10 institutions, and served more than 10 educational institutions with our consulting services. Over the years, we have helped thousands of students achieve their dreams.";
    }
    
    // Benefits
    if (lower.includes("benefit") || lower.includes("advantage") || lower.includes("why choose")) {
      return "Choosing Gyan Rich means getting personalized attention, expert guidance from certified counselors, access to high-quality educational content, modern digital solutions for your institution, and comprehensive support for both students and schools. We focus on emotional wellness, academic excellence, and digital transformation all in one platform.";
    }
    
    // Workshop/Training
    if (lower.includes("workshop") || lower.includes("ai") || lower.includes("coding") || lower.includes("iq test")) {
      return "We conduct workshops on career guidance, AI and coding, and provide IQ aptitude tests to enhance students' knowledge. These workshops are included in our packages and are designed to help students build confidence, understand modern technology, and discover their strengths.";
    }
    
    // Default response
    return "Thank you for your question about " + transcript + ". Gyan Rich offers expert counselling, video lectures, custom websites, and consulting services for educational institutions. For detailed information about our services and pricing, please visit our website or contact us through the 'Get Started' button. How else can I help you?";
  };

  const generateResponseHindi = (transcript: string): string => {
    const lower = transcript.toLowerCase();
    
    // Greetings
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("नमस्ते") || lower.includes("हेलो") || lower.includes("हाय")) {
      return "नमस्ते! ज्ञान रिच में आपका स्वागत है। हम एक शैक्षिक मंच हैं जो छात्रों और संस्थानों को नवीन समाधानों के माध्यम से सशक्त बनाता है। मैं आपकी कैसे मदद कर सकता हूं?";
    }
    
    // About company
    if (lower.includes("बारे") || lower.includes("कौन") || lower.includes("क्या है")) {
      return "ज्ञान रिच एक शैक्षिक मंच है जो आकांक्षाओं और उपलब्धियों के बीच की खाई को पाटता है। हम विशेषज्ञ काउंसलिंग सत्र, इंटरैक्टिव वीडियो लेक्चर और स्कूलों के लिए अनुकूलित डिजिटल प्लेटफॉर्म प्रदान करते हैं। हमारा मिशन संस्थानों को पाठ्यपुस्तकों से परे जाने में सशक्त बनाना है।";
    }
    
    // Services
    if (lower.includes("सेवा") || lower.includes("सर्विस")) {
      return "हम चार मुख्य सेवाएं प्रदान करते हैं। पहली, विशेषज्ञ काउंसलिंग सत्र जिसमें व्यक्तिगत करियर मार्गदर्शन और भावनात्मक स्वास्थ्य सहायता शामिल है। दूसरी, कक्षा 9 से 12 के लिए पूर्व-रिकॉर्डेड वीडियो लेक्चर। तीसरी, रिस्पॉन्सिव डिज़ाइन के साथ कस्टम स्कूल वेबसाइट। और चौथी, पाठ्यक्रम विकास और स्टाफ प्रशिक्षण सहित अतिरिक्त परामर्श सेवाएं।";
    }
    
    // Counselling
    if (lower.includes("काउंसलिंग") || lower.includes("परामर्श") || lower.includes("करियर")) {
      return "हमारे विशेषज्ञ काउंसलिंग सत्र में रुचियों और शक्तियों के आधार पर व्यक्तिगत करियर मार्गदर्शन, प्रमाणित अनुभवी काउंसलर, तनाव और चिंता को कम करने के लिए भावनात्मक स्वास्थ्य सहायता, मानसिकता और आत्मविश्वास निर्माण कार्यक्रम शामिल हैं। हमने 500 से अधिक छात्रों को सफलतापूर्वक काउंसल किया है।";
    }
    
    // Video Lectures
    if (lower.includes("वीडियो") || lower.includes("लेक्चर") || lower.includes("क्लास")) {
      return "हम कक्षा 9 से 12 के लिए विभिन्न विषयों में पूर्व-रिकॉर्डेड वीडियो लेक्चर प्रदान करते हैं। हमारी सुविधाओं में मांग पर उच्च गुणवत्ता वाले रिकॉर्डेड लेक्चर, विशिष्ट विषय विशेषज्ञ, प्रश्नोत्तर सत्र और अध्ययन सामग्री शामिल हैं। हमारे पास 300 से अधिक घंटे की शैक्षिक सामग्री उपलब्ध है।";
    }
    
    // Website
    if (lower.includes("वेबसाइट") || lower.includes("वेब")) {
      return "हम शैक्षिक संस्थानों के लिए विशेष रूप से तैयार की गई पेशेवर, रिस्पॉन्सिव डिज़ाइन के साथ कस्टम स्कूल वेबसाइट बनाते हैं। हमारी वेबसाइटों में एक वर्ष की मुफ्त होस्टिंग और रखरखाव, बेहतर ऑनलाइन उपस्थिति के लिए SEO अनुकूलन शामिल है। हमने 10 से अधिक संस्थानों के लिए वेबसाइट प्रदान की है।";
    }
    
    // Pricing
    if (lower.includes("कीमत") || lower.includes("मूल्य") || lower.includes("पैकेज") || lower.includes("प्राइस")) {
      return "हम तीन पैकेज प्रदान करते हैं। बेसिक पैकेज 3 महीने के लिए रुपये 17,999 में जिसमें मासिक करियर काउंसलिंग, कार्यशालाएं और आईक्यू टेस्ट शामिल हैं। एडवांस्ड पैकेज 3 महीने के लिए रुपये 34,999 में जिसमें सभी बेसिक फीचर्स के साथ पोर्टफोलियो बिल्डिंग शामिल है। प्रीमियम पैकेज 3 महीने के लिए रुपये 59,999 में जिसमें कस्टम लेक्चर, वेबसाइट बिल्डिंग और प्राथमिकता समर्थन शामिल है।";
    }
    
    // Mission
    if (lower.includes("मिशन") || lower.includes("उद्देश्य")) {
      return "हमारा मिशन नवीन शैक्षिक समाधानों और विशेषज्ञ मार्गदर्शन के माध्यम से छात्रों और संस्थानों को सशक्त बनाना है। हम छात्रों को उनकी क्षमता खोजने में मदद करना चाहते हैं।";
    }
    
    // Contact
    if (lower.includes("संपर्क") || lower.includes("कैसे") || lower.includes("फोन")) {
      return "आप हमारे संपर्क फॉर्म के माध्यम से या हमारी वेबसाइट पर 'Get Started' बटन पर क्लिक करके हमसे संपर्क कर सकते हैं। हमारी टीम आपके किसी भी प्रश्न में आपकी सहायता करने में खुश होगी।";
    }
    
    // Achievements
    if (lower.includes("उपलब्धि") || lower.includes("सफलता")) {
      return "हमने महत्वपूर्ण उपलब्धियां हासिल की हैं: 500 से अधिक छात्रों को काउंसल किया, 300 से अधिक घंटे की शैक्षिक सामग्री बनाई, 10 से अधिक संस्थानों के लिए वेबसाइट प्रदान की। वर्षों में, हमने हजारों छात्रों को उनके सपने हासिल करने में मदद की है।";
    }
    
    // Default Hindi response
    return "आपके प्रश्न के लिए धन्यवाद। ज्ञान रिच शैक्षिक संस्थानों के लिए विशेषज्ञ काउंसलिंग, वीडियो लेक्चर, कस्टम वेबसाइट और परामर्श सेवाएं प्रदान करता है। हमारी सेवाओं और मूल्य निर्धारण के बारे में विस्तृत जानकारी के लिए, कृपया हमारी वेबसाइट पर जाएं या 'Get Started' बटन के माध्यम से हमसे संपर्क करें। मैं और कैसे आपकी मदद कर सकता हूं?";
  };

  const generateAndPlaySpeech = async (text: string, apiKey: string, isHindi: boolean = false) => {
    try {
      // Replace "Gyaan" with phonetic spelling for correct pronunciation
      const speechText = text.replace(/Gyaan/gi, "Gyan").replace(/gyaan/gi, "gyan");
      
      // Use English model for both languages - Deepgram's Aura models can handle transliteration
      // For Hindi, we'll use the English model as it provides better compatibility
      const ttsModel = "aura-asteria-en";
      
      const response = await fetch(`https://api.deepgram.com/v1/speak?model=${ttsModel}`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: speechText }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Failed to generate speech:", response.status, errorData);
        
        // Fallback: If TTS fails, still show the text response
        console.log("Speech synthesis failed, but text response is available");
        return;
      }

      const audioBlob = await response.blob();
      
      // Check if we got valid audio data
      if (audioBlob.size === 0) {
        console.error("Received empty audio blob");
        return;
      }
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Add error handler for audio playback
      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

    } catch (err) {
      console.error("Failed to play speech:", err);
      // Don't throw - allow the conversation to continue with text only
    }
  };

  const stopListening = useCallback(() => {
    // Clear silence detection
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsListening(false);
    setIsProcessing(true);
  }, []);

  const reset = useCallback(() => {
    // Stop any ongoing recording
    if (isListening) {
      stopListening();
    }
    
    setTranscript("");
    setResponse("");
    setError(null);
    setIsProcessing(false);
  }, [isListening, stopListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isListening,
    isProcessing,
    transcript,
    response,
    error,
    startListening,
    stopListening,
    reset,
  };
}
