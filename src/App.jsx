import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import Dashboard from './components/Dashboard';
import MateriKuis from './components/MateriKuis';
import MisiFotoAI from './components/MisiFotoAI';
import TokoKarakter from './components/TokoKarakter';
import ProfilSaya from './components/ProfilSaya';
import ApiKeyModal from './components/ApiKeyModal';
import LoginPage from './components/LoginPage';
import { 
  getCurrentAuthUser, 
  setCurrentAuthUser, 
  clearAuthUser, 
  loadStudentData, 
  saveStudentData 
} from './utils/storage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentAuthUser());
  const [student, setStudent] = useState(() => loadStudentData(currentUser));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courseHubSubTab, setCourseHubSubTab] = useState('materi');
  const [selectedMission, setSelectedMission] = useState(null);
  const [targetMateriId, setTargetMateriId] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Sync updates to LocalStorage for currently logged-in user
  const handleUpdateStudentData = (updatedData) => {
    setStudent(updatedData);
    saveStudentData(updatedData, currentUser);
  };

  const handleLogin = (user, rememberMe = true) => {
    if (rememberMe) {
      setCurrentAuthUser(user);
    }
    setCurrentUser(user);
    const userData = loadStudentData(user);
    setStudent(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    clearAuthUser();
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleNavigateToCourseHub = (subTab = 'misi', mission = null, materiId = null) => {
    setCourseHubSubTab(subTab);
    setSelectedMission(mission);
    if (materiId) setTargetMateriId(materiId);
    setActiveTab('materi');
  };

  // If user is not logged in, show the Login Page
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Left Vertical Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-100">
        
        {/* Top Header Bar */}
        <HeaderBar 
          student={student} 
          currentUser={currentUser}
          onLogout={handleLogout}
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
              initialMateriId={targetMateriId}
              onClearInitialMateriId={() => setTargetMateriId(null)}
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
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          )}
        </main>

      </div>

      {/* API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        student={student}
        updateStudentData={handleUpdateStudentData}
      />

    </div>
  );
}
