import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import Dashboard from './components/Dashboard';
import MateriKuis from './components/MateriKuis';
import MisiFotoAI from './components/MisiFotoAI';
import TokoKarakter from './components/TokoKarakter';
import ProfilSaya from './components/ProfilSaya';
import ApiKeyModal from './components/ApiKeyModal';
import { loadStudentData, saveStudentData } from './utils/storage';

export default function App() {
  const [student, setStudent] = useState(() => loadStudentData());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courseHubSubTab, setCourseHubSubTab] = useState('materi');
  const [selectedMission, setSelectedMission] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Sync updates to LocalStorage
  const handleUpdateStudentData = (updatedData) => {
    setStudent(updatedData);
    saveStudentData(updatedData);
  };

  const handleNavigateToCourseHub = (subTab = 'misi', mission = null) => {
    setCourseHubSubTab(subTab);
    setSelectedMission(mission);
    setActiveTab('materi');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Left Vertical Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-100">
        
        {/* Top Header Bar */}
        <HeaderBar 
          student={student} 
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        />

        {/* View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard 
              student={student} 
              updateStudentData={handleUpdateStudentData}
              setActiveTab={setActiveTab} 
              onNavigateToCourseHub={handleNavigateToCourseHub}
            />
          )}

          {activeTab === 'materi' && (
            <MateriKuis 
              student={student} 
              updateStudentData={handleUpdateStudentData} 
              subTab={courseHubSubTab}
              setSubTab={setCourseHubSubTab}
              setActiveTab={setActiveTab}
              initialSelectedMission={selectedMission}
              onClearInitialMission={() => setSelectedMission(null)}
            />
          )}

          {activeTab === 'ai-mission' && (
            <MisiFotoAI 
              student={student} 
              updateStudentData={handleUpdateStudentData} 
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            />
          )}

          {activeTab === 'shop' && (
            <TokoKarakter 
              student={student} 
              updateStudentData={handleUpdateStudentData} 
            />
          )}

          {activeTab === 'profile' && (
            <ProfilSaya 
              student={student} 
              updateStudentData={handleUpdateStudentData} 
            />
          )}
        </main>

      </div>

      {/* Gemini API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        student={student}
        updateStudentData={handleUpdateStudentData}
      />

    </div>
  );
}
