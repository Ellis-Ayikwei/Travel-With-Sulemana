"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Calendar, Users, DollarSign, 
  CheckCircle, ArrowRight, ArrowLeft, 
  Sparkles, Compass, Globe 
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function PlanYourTripPage() {
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "moderate",
    interests: [] as string[],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  const steps = [
    { id: 1, name: "Destination", label: "Where to?" },
    { id: 2, name: "Timeline", label: "When?" },
    { id: 3, name: "Group", label: "Who?" },
    { id: 4, name: "Interests", label: "What?" },
  ];

  const destinations = [
    "Mole National Park", "Cape Coast Castle", "Kakum National Park", 
    "Larabanga", "Accra", "Elmina", "Wli Falls", "Takoradi"
  ];

  const toggleInterest = (id: string) => {
    setTripDetails((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* --- HEADER --- */}
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Compass className="w-3 h-3" /> Trip Designer
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {showSummary ? "Review Your Itinerary" : "Plan Your Journey"}
            </h1>
          </div>

          {!showSummary ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* --- STEP NAV --- */}
              <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      currentStep === step.id 
                        ? "bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800" 
                        : "opacity-40"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= step.id ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-800"
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[10px] uppercase font-black text-gray-400">{step.name}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* --- MAIN FORM --- */}
              <div className="lg:col-span-9">
                <motion.div 
                  layout
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none p-8 md:p-12"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentStep === 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {destinations.map((dest) => (
                            <button
                              key={dest}
                              onClick={() => setTripDetails({ ...tripDetails, destination: dest })}
                              className={`p-4 rounded-2xl border-2 transition-all text-left group ${
                                tripDetails.destination === dest
                                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                                  : "border-gray-100 dark:border-gray-800 hover:border-emerald-200"
                              }`}
                            >
                              <Globe className={`w-5 h-5 mb-2 ${tripDetails.destination === dest ? "text-emerald-500" : "text-gray-400"}`} />
                              <span className="font-bold text-gray-900 dark:text-white text-sm">{dest}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {["startDate", "endDate"].map((field) => (
                            <div key={field}>
                              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
                                {field === "startDate" ? "Arrival" : "Departure"}
                              </label>
                              <input 
                                type="date"
                                value={tripDetails[field as keyof typeof tripDetails] as string}
                                onChange={(e) => setTripDetails({...tripDetails, [field]: e.target.value})}
                                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-8">
                          <div>
                            <label className="block text-xs font-black uppercase text-gray-400 mb-6 tracking-widest text-center">Number of Travelers</label>
                            <div className="flex items-center justify-center gap-8">
                              <button onClick={() => setTripDetails(p => ({...p, travelers: Math.max(1, p.travelers - 1)}))} className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-2xl font-light hover:bg-emerald-500 hover:text-white transition-colors">-</button>
                              <span className="text-6xl font-black italic text-gray-900 dark:text-white">{tripDetails.travelers}</span>
                              <button onClick={() => setTripDetails(p => ({...p, travelers: p.travelers + 1}))} className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-2xl font-light hover:bg-emerald-500 hover:text-white transition-colors">+</button>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {["Wildlife", "History", "Food", "Art", "Hiking", "Beach"].map((interest) => (
                            <button
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={`p-4 rounded-xl border text-xs font-bold uppercase tracking-tight transition-all ${
                                tripDetails.interests.includes(interest)
                                  ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30"
                                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* NAV BUTTONS */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      disabled={currentStep === 1}
                      className="text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-0 transition-all flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                    <button 
                      onClick={() => currentStep === 4 ? setShowSummary(true) : setCurrentStep(prev => prev + 1)}
                      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2"
                    >
                      {currentStep === 4 ? "Finalize Plan" : "Continue"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            /* --- SUMMARY CARD --- */
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl"
            >
              <div className="bg-emerald-500 p-8 text-white">
                <Sparkles className="w-8 h-8 mb-4" />
                <h2 className="text-3xl font-black uppercase italic">Ready for Departure</h2>
              </div>
              <div className="p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Destination</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{tripDetails.destination}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Dates</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{tripDetails.startDate} - {tripDetails.endDate}</p>
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {tripDetails.interests.map(i => (
                    <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
                      {i}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-8">
                  <Link href="/book" className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-5 rounded-2xl text-center font-bold hover:opacity-90 transition-opacity">
                    Confirm & See Trips
                  </Link>
                  <button onClick={() => setShowSummary(false)} className="px-8 py-5 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}