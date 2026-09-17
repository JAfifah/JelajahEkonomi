import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import Dashboard from './components/Dashboard';
import MateriKuis from './components/MateriKuis';
import MisiFotoAI from './components/MisiFotoAI';
import TokoKarakter from './components/TokoKarakter';
import ProfilSaya from './components/ProfilSaya';
import ApiKeyModal from './components/ApiKeyModal';
import LoginPage from './components/LoginPage';
import LeaderboardAdmin from './components/LeaderboardAdmin';
import { 
  getCurrentAuthUser, 
  setCurrentAuthUser, 
  clearAuthUser, 
  loadStudentData, 
  saveStudentData 
} from './utils/storage';
import { fetchStudentDataApi } from './utils/apiService';
import { soundFx } from './utils/audio';
import { LogOut, X } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentAuthUser());
  const [student, setStudent] = useState(() => loadStudentData(currentUser));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courseHubSubTab, setCourseHubSubTab] = useState('materi');
  const [selectedMission, setSelectedMission] = useState(null);
  const [targetMateriId, setTargetMateriId] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Sync fresh student data from MySQL on mount or when user changes
  useEffect(() => {
    if (currentUser?.username) {
      fetchStudentDataApi(currentUser.username).then((dbData) => {
        if (dbData) {
          setStudent(dbData);
          saveStudentData(dbData, currentUser);
        }
      }).catch(err => {
        console.warn('Could not sync student from MySQL:', err);
      });
    }
  }, [currentUser?.username]);

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

  const handlePromptLogout = () => {
    soundFx.playClick();
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    soundFx.playClick();
    setShowLogoutModal(false);
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
        onLogout={handlePromptLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-100">
        
        {/* Top Header Bar */}
        <HeaderBar 
          student={student} 
          currentUser={currentUser}
          onLogout={handlePromptLogout}
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

          {activeTab === 'leaderboard' && (
            <LeaderboardAdmin 
              currentUser={currentUser}
            />
          )}

          {activeTab === 'profile' && (
            <ProfilSaya 
              student={student} 
              updateStudentData={handleUpdateStudentData} 
              currentUser={currentUser}
              onLogout={handlePromptLogout}
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

      {/* ========================================================================= */}
      {/* MODAL POP-UP KONFIRMASI LOGOUT */}
      {/* ========================================================================= */}
      {showLogoutModal && (
        <div 
          onClick={() => setShowLogoutModal(false)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl max-w-xs sm:max-w-sm w-full p-5 sm:p-6 relative animate-scale-up space-y-4 text-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Batal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-200">
              <LogOut className="w-6 h-6" />
            </div>

            {/* Title & Message */}
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Keluar Akun?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apakah kamu yakin ingin keluar dari akun <strong className="text-slate-800">{student?.name || currentUser?.name || 'kamu'}</strong>?
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
