import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeWasteQuery } from '../../data/ewasteKnowledge';
import { 
  Bot, 
  Camera, 
  Send, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Info, 
  Upload, 
  Scan, 
  Cpu, 
  Layers, 
  Atom, 
  ArrowRight,
  Maximize2,
  RefreshCw,
  Gift,
  FileImage,
  Video,
  X,
  Zap,
  HelpCircle,
  Trash2
} from 'lucide-react';

export const AiAdvisorPage = () => {
  const { t, claimCredits, userCredits } = useApp();

  // Chat message state
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello Eco-Warrior! I am your IBM Granite RAG Campus E-Waste Advisor. Ask me anything about segregating electronics (e.g., headphones, batteries, laptops, chargers, screens, motherboards), or click **Multimodal Camera Scan** to upload/scan a photo of any device for optical decomposition of toxic materials.",
      timestamp: 'Just now',
      ragCitations: ['Campus E-Waste Protocol §12.4', 'Central Pollution Control Board Norms 2026'],
      toxicBreakdown: null,
      hazard: null,
      canClaim: false
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Camera scanner modal state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPresetKey, setSelectedPresetKey] = useState('battery');
  
  // Real Image Upload & Camera state
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState(null);

  // Chat Container ref (Prevents page from jumping down on open)
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const initialRenderRef = useRef(true);

  // Smooth scroll ONLY inside chat container, never moving outer window
  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return; // Do NOT auto-scroll window on page mount
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Handle webcam stream start/stop
  useEffect(() => {
    let stream = null;
    if (isWebcamActive) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn("Webcam access error:", err);
          setWebcamError("Camera access unavailable. Please upload a photo instead.");
          setIsWebcamActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isWebcamActive]);

  // Presets database for quick optical scan preview
  const presetKeys = [
    { key: 'battery', label: '⚡ Swollen Li-Ion Phone Battery', query: 'swollen bloated battery' },
    { key: 'adapter', label: '🔌 Frayed Laptop Charger & Cords', query: 'frayed laptop charger cord' },
    { key: 'motherboard', label: '💻 Corroded Motherboard & RAM', query: 'corroded motherboard ram pcb' },
    { key: 'bulb', label: '💡 Compact Fluorescent CFL Bulb', query: 'cfl fluorescent tube bulb mercury' },
    { key: 'headphones', label: '🎧 Wireless Earbuds & Charging Case', query: 'airpods earbuds headphones' },
    { key: 'vape', label: '🚭 Disposable Vape / E-Cigarette', query: 'disposable vape pod e-cigarette' }
  ];

  // Discard / Remove current active photo
  const clearCurrentPhoto = () => {
    setUploadedImagePreview(null);
    setUploadedImageName('');
    setIsWebcamActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle image file selection (Upload)
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setUploadedImagePreview(uploadEvent.target?.result);
      setUploadedImageName(file.name);
      setIsWebcamActive(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle webcam photo snap
  const handleCaptureWebcam = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setUploadedImagePreview(dataUrl);
    setUploadedImageName('Live_Webcam_Capture.jpg');
    setIsWebcamActive(false);
  };

  // Trigger optical scan execution
  const executeScan = (customQuery = null, imagePreview = uploadedImagePreview) => {
    if (isScanning || isTyping) return;
    setIsScanning(true);
    setScanProgress(0);

    let progress = 0;
    const queryToAnalyze = customQuery || uploadedImageName || selectedPresetKey;
    const imageToAttach = imagePreview; // capture current image for this message only

    const timer = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(timer);
        setScanProgress(100);
        setIsScanning(false);
        setIsScannerOpen(false);

        // 1. Deliver result with this picture
        deliverAnalysisResult(queryToAnalyze, imageToAttach);

        // 2. CRUCIAL: Immediately clear the uploaded picture from state so subsequent questions are fresh!
        clearCurrentPhoto();
      } else {
        setScanProgress(progress);
      }
    }, 280);
  };

  // Deliver single AI response from scan or text question
  const deliverAnalysisResult = (query, imageThumb = null) => {
    const analysis = analyzeWasteQuery(query);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const isFireHazard = analysis.hazardSeverity === 'CRITICAL';

      const responseMsg = {
        id: 'msg-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
        sender: 'ai',
        text: `Analysis complete! Identified item: **${analysis.name}** [${analysis.category}]. Verified against campus disposal records & UN SDG 12 standards.`,
        imagePreview: imageThumb, // only attached if this specific action uploaded an image
        timestamp: 'Just now',
        ragCitations: analysis.ragCitations,
        toxicBreakdown: analysis.toxicMaterials,
        hazard: {
          isFireHazard,
          severity: analysis.hazardSeverity,
          message: analysis.hazardMessage,
          recommendation: analysis.recommendation,
          acceptedLocation: analysis.acceptedLocation
        },
        itemName: analysis.name,
        canClaim: analysis.canClaim,
        claimed: false
      };

      setMessages(prev => [...prev, responseMsg]);
    }, 650);
  };

  // Handle Quick Prompts (clean slate: clear any previously held photo)
  const handleQuickPrompt = (promptType) => {
    if (isTyping) return;

    // Clear any previous image so this text query doesn't attach an old photo
    clearCurrentPhoto();

    let queryText = "";
    if (promptType === 'battery') {
      queryText = "⚡ How should I safely dispose of a swollen phone battery on campus?";
    } else if (promptType === 'adapter') {
      queryText = "🔌 Where do I recycle broken laptop adapters and tangled cables?";
    } else if (promptType === 'motherboard') {
      queryText = "💻 What bin takes old fried motherboards and computer RAM?";
    }

    const userMsg = {
      id: 'user-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
      sender: 'user',
      text: queryText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    deliverAnalysisResult(queryText, null); // explicitly pass null image
  };

  // Handle user custom query submit (clean slate: clear any previous photo)
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || isTyping) return;

    const query = inputQuery.trim();
    setInputQuery('');

    // Clear any previous uploaded image so it's not reused for this new question!
    clearCurrentPhoto();

    const userMsg = {
      id: 'user-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    deliverAnalysisResult(query, null); // explicitly pass null image
  };

  // Claim Eco-Credits action
  const handleClaim = (messageId, itemTitle) => {
    claimCredits(itemTitle);

    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        return { ...m, claimed: true };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-[#0c2419] to-[#07130e] p-6 sm:p-8 text-white border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            IBM Granite 3.0 RAG Pipeline
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {t.aiAdvisor.heroTitle}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Ask about any electronic device, cable, battery, monitor or appliance — or upload an image to run optical spectrometry on toxic components!
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-bold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Camera className="w-4 h-4 text-emerald-950" />
              <span>{t.aiAdvisor.scanButton} / Upload Photo</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium bg-black/30 px-3.5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>UN SDG 12 Verified Protocols Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Chat Stream */}
        <div className="lg:col-span-2 flex flex-col h-[680px] rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-xl overflow-hidden">
          
          {/* Chat header bar */}
          <div className="p-4 px-6 bg-slate-50/80 dark:bg-[#101b15] border-b border-slate-200 dark:border-emerald-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-[#101b15] rounded-full"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  IBM Granite E-Waste Segregation RAG
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Comprehensive Diagnostic Database • 30+ Device Categories
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload / Scan</span>
              </button>
            </div>
          </div>

          {/* Chat Messages scroll area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-4 sm:p-5 transition-all ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 dark:bg-[#14231b] text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-emerald-900/40 shadow-sm'
                  }`}
                >
                  {/* Sender title & time */}
                  <div className="flex items-center justify-between text-[11px] mb-2 opacity-75 font-medium">
                    <span className="flex items-center gap-1">
                      {msg.sender === 'ai' ? <Bot className="w-3 h-3" /> : null}
                      {msg.sender === 'ai' ? 'IBM Granite AI' : 'You (Student)'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Uploaded Image Thumbnail if message originated from camera scan */}
                  {msg.imagePreview && (
                    <div className="mb-3 rounded-2xl overflow-hidden border border-emerald-500/30 max-h-48 w-full bg-black/40 flex items-center justify-center relative">
                      <img 
                        src={msg.imagePreview} 
                        alt="Scanned item" 
                        className="w-full h-44 object-contain"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-mono">
                        📸 Spectrometric Source Frame
                      </div>
                    </div>
                  )}

                  {/* Message body text */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Toxic Material Breakdown Card if present */}
                  {msg.toxicBreakdown && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-emerald-900/50">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300">
                        <Atom className="w-4 h-4 text-emerald-500" />
                        <span>{t.aiAdvisor.toxicBreakdownTitle}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {msg.toxicBreakdown.map((mat, i) => (
                          <div key={i} className="text-xs">
                            <div className="flex justify-between items-center mb-1 font-medium">
                              <span className="text-slate-700 dark:text-slate-300">{mat.name}</span>
                              <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-black/40 text-slate-800 dark:text-emerald-300">
                                {mat.percentage}% • {mat.level}
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${mat.color} rounded-full transition-all duration-700`}
                                style={{ width: `${mat.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Critical Hazard Alert Card */}
                  {msg.hazard && (
                    <div className="mt-4">
                      {msg.hazard.isFireHazard ? (
                        <div className="relative overflow-hidden p-4 rounded-2xl bg-rose-600/10 dark:bg-rose-950/40 border-2 border-rose-500 animate-pulse text-rose-900 dark:text-rose-200 glow-red">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0">
                              <Flame className="w-5 h-5 animate-bounce" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 tracking-wide uppercase">
                                {t.aiAdvisor.fireHazardTitle}
                              </h4>
                              <p className="text-xs text-rose-800 dark:text-rose-200 font-semibold leading-relaxed">
                                {msg.hazard.message}
                              </p>
                              <div className="mt-2 text-[11px] font-mono p-2 rounded-xl bg-white dark:bg-black/50 border border-rose-400/40 text-rose-950 dark:text-rose-300">
                                📍 Required Routing: {msg.hazard.acceptedLocation}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200">
                          <div className="flex items-start gap-2.5">
                            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="text-xs">
                              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-0.5">
                                {t.aiAdvisor.standardSafetyTitle}
                              </h5>
                              <p className="text-slate-600 dark:text-slate-300">{msg.hazard.recommendation}</p>
                              <p className="mt-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                                📍 Designated Hub: {msg.hazard.acceptedLocation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* RAG citations */}
                  {msg.ragCitations && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-emerald-950/40 text-[10px] text-slate-500 dark:text-emerald-400/70 font-mono">
                      {msg.ragCitations.map((cit, ci) => (
                        <span key={ci} className="px-2 py-0.5 rounded-md bg-slate-200/50 dark:bg-emerald-950/40 border border-slate-300/40 dark:border-emerald-900/30">
                          📚 {cit}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Claim Eco-Credits Code button (+15 XP) */}
                  {msg.canClaim && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-emerald-900/40">
                      {msg.claimed ? (
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>{t.aiAdvisor.claimedNotice}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleClaim(msg.id, msg.itemName)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                          <Gift className="w-4 h-4 text-amber-300" />
                          <span>{t.aiAdvisor.claimButton}</span>
                        </button>
                      )}
                    </div>
                  )}

                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-emerald-400/80 italic p-3 bg-slate-100 dark:bg-[#14231b] rounded-2xl w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                <span>IBM Granite RAG searching campus safety database & chemical specs...</span>
              </div>
            )}
          </div>

          {/* Pre-configured Quick Diagnostic Prompt Buttons */}
          <div className="p-3 bg-slate-50 dark:bg-[#0e1713] border-t border-slate-200 dark:border-emerald-950/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-400/80 mb-2 px-1">
              {t.aiAdvisor.promptsTitle}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickPrompt('battery')}
                disabled={isTyping}
                className="p-2 sm:p-2.5 text-left text-xs font-medium rounded-xl bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300/40 dark:border-rose-900/40 transition-all truncate disabled:opacity-50"
                title={t.aiAdvisor.prompt1}
              >
                {t.aiAdvisor.prompt1}
              </button>
              <button
                onClick={() => handleQuickPrompt('adapter')}
                disabled={isTyping}
                className="p-2 sm:p-2.5 text-left text-xs font-medium rounded-xl bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/40 dark:border-amber-900/40 transition-all truncate disabled:opacity-50"
                title={t.aiAdvisor.prompt2}
              >
                {t.aiAdvisor.prompt2}
              </button>
              <button
                onClick={() => handleQuickPrompt('motherboard')}
                disabled={isTyping}
                className="p-2 sm:p-2.5 text-left text-xs font-medium rounded-xl bg-cyan-50 dark:bg-cyan-950/20 hover:bg-cyan-100 dark:hover:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-300/40 dark:border-cyan-900/40 transition-all truncate disabled:opacity-50"
                title={t.aiAdvisor.prompt3}
              >
                {t.aiAdvisor.prompt3}
              </button>
            </div>
          </div>

          {/* Text Input Field */}
          <form onSubmit={handleCustomSubmit} className="p-3 sm:p-4 bg-white dark:bg-[#0c1410] border-t border-slate-200 dark:border-emerald-950/80 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about headphones, phones, AA batteries, monitors, kettles, chargers..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#121f18] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.aiAdvisor.send}</span>
            </button>
          </form>

        </div>

        {/* Right Col: Optical Diagnostic HUD Preview & Guidelines */}
        <div className="space-y-4">
          
          {/* Camera Scanner Interactive Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0e1d16] text-white border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Scan className="w-4 h-4 text-emerald-400" />
                Optical Spectrometer Lens
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* Viewport Mockup with laser scan effect */}
            <div 
              className="relative aspect-video rounded-2xl bg-black/60 border border-emerald-500/40 overflow-hidden flex items-center justify-center group"
            >
              {/* If an image is currently staged */}
              {uploadedImagePreview ? (
                <div className="relative w-full h-full">
                  <img 
                    src={uploadedImagePreview} 
                    alt="Current item" 
                    className="w-full h-full object-cover"
                  />
                  {/* Remove button to discard image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearCurrentPhoto();
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white text-xs transition-colors z-30"
                    title="Remove Image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => setIsScannerOpen(true)}
                >
                  <div className="absolute inset-0 bg-dot-pattern opacity-30 z-10"></div>
                  <div className="relative z-10 text-center p-4">
                    <div className="w-12 h-12 mx-auto rounded-full border-2 border-dashed border-emerald-400/80 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-white tracking-wide">
                      Click to Upload or Scan
                    </p>
                    <p className="text-[11px] text-emerald-300/80 mt-0.5">
                      Supports JPG, PNG, WEBP & Camera
                    </p>
                  </div>
                </div>
              )}

              {/* Laser scan animation line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scan-beam z-20 pointer-events-none"></div>

              {/* HUD corner marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none"></div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
              {uploadedImagePreview ? (
                <button
                  onClick={clearCurrentPhoto}
                  className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              ) : (
                <span className="text-slate-400">Ready for camera input</span>
              )}
              <button
                onClick={() => setIsScannerOpen(true)}
                className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1"
              >
                Launch Lens &rarr;
              </button>
            </div>
          </div>

          {/* Quick Item Presets Selector */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0c1410] border border-slate-200 dark:border-emerald-950/80 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" />
              Direct Spectrometry Presets
            </h4>
            <div className="space-y-1.5">
              {presetKeys.map((p) => (
                <button
                  key={p.key}
                  disabled={isTyping}
                  onClick={() => {
                    clearCurrentPhoto(); // Ensure previous custom photo is cleared
                    setSelectedPresetKey(p.key);
                    executeScan(p.query, null);
                  }}
                  className="w-full text-left p-2.5 rounded-xl border bg-slate-50 dark:bg-[#121e17] hover:border-emerald-500 border-slate-200 dark:border-emerald-900/40 text-xs transition-all hover:translate-x-1 flex items-center justify-between disabled:opacity-50"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {p.label}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Live Eco-Credit balance banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-emerald-950 font-black flex items-center justify-center text-sm shadow-md">
                XP
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Current Eco-Credits: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">+{userCredits} XP</span>
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Earn +15 XP for every verified campus disposal
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Multimodal Camera Scan & Image Upload Full Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl p-6 text-white overflow-hidden max-h-[90vh] flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Multimodal Optical E-Waste Diagnostic Lens</h3>
              </div>
              <button
                onClick={() => { 
                  setIsScannerOpen(false); 
                  setIsScanning(false); 
                  setIsWebcamActive(false); 
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Upload a photo from your computer, use device webcam, or select a campus sample for AI chemical and hazardous decomposition.
            </p>

            {/* Input Action Bar: Upload File or Use Webcam */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image File</span>
              </button>

              <button
                onClick={() => {
                  setIsWebcamActive(!isWebcamActive);
                  setUploadedImagePreview(null);
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  isWebcamActive
                    ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-slate-800 border-slate-700 hover:border-emerald-500 text-slate-200'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>{isWebcamActive ? 'Stop Webcam' : 'Use Live Camera'}</span>
              </button>

              {uploadedImagePreview && (
                <button
                  onClick={clearCurrentPhoto}
                  className="px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Discard photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Photo</span>
                </button>
              )}

              {uploadedImageName && (
                <span className="text-xs text-emerald-400 font-mono truncate max-w-[180px] bg-black/40 px-2 py-1 rounded">
                  📁 {uploadedImageName}
                </span>
              )}
            </div>

            {/* Viewfinder simulation container */}
            <div className="relative aspect-video rounded-2xl bg-black border-2 border-emerald-500/60 overflow-hidden flex flex-col items-center justify-center">
              
              {/* If webcam is active */}
              {isWebcamActive ? (
                <div className="relative w-full h-full">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 inset-x-0 flex justify-center">
                    <button
                      onClick={handleCaptureWebcam}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-extrabold text-xs shadow-lg flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Snap Frame
                    </button>
                  </div>
                </div>
              ) : uploadedImagePreview ? (
                /* If user uploaded an image */
                <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                  <img 
                    src={uploadedImagePreview} 
                    alt="Uploaded preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-lg text-xs font-mono">
                    ✓ Custom Image Staged for Scan
                  </div>
                </div>
              ) : (
                /* Fallback preview */
                <div className="text-center p-6 space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <FileImage className="w-8 h-8 opacity-70" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Drag & drop or upload any photo of e-waste here
                  </p>
                  <p className="text-[11px] text-slate-500">
                    JPG, PNG, WEBP up to 25MB
                  </p>
                </div>
              )}

              {/* Scan beam animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 shadow-[0_0_15px_#34d399] animate-scan-beam z-30 pointer-events-none"></div>
              )}

              {/* HUD corner marks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none"></div>

              {/* Center Target Crosshair */}
              <div className="absolute w-28 h-28 rounded-full border border-dashed border-emerald-400/40 flex items-center justify-center pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              </div>

              {/* Progress bar overlay during scan */}
              {isScanning && (
                <div className="absolute bottom-6 inset-x-6 bg-black/85 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/50 text-center z-40">
                  <div className="text-xs font-bold text-emerald-300 mb-1.5 flex items-center justify-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    <span>Decomposing item spectroscopy via IBM Granite Vision... ({scanProgress}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Presets fast pick */}
            <div className="mt-3">
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Or choose from campus reference items:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                {presetKeys.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => {
                      clearCurrentPhoto();
                      setSelectedPresetKey(p.key);
                      setUploadedImageName(p.label);
                    }}
                    className={`p-2 rounded-xl border text-left truncate transition-colors ${
                      selectedPresetKey === p.key && !uploadedImagePreview
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsScannerOpen(false);
                  setIsWebcamActive(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              
              <button
                onClick={() => executeScan(uploadedImageName || selectedPresetKey, uploadedImagePreview)}
                disabled={isScanning}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Scan className="w-4 h-4" />
                <span>{isScanning ? 'Analyzing Spectroscopy...' : 'Execute AI Diagnostic'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
