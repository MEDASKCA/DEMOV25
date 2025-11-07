'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { Sparkles } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import SubMenuModal from '@/components/SubMenuModal';
import FloatingMessenger from '@/components/FloatingMessenger';
import FeedsView from '@/components/views/FeedsView';
import DashboardViewNew from '@/components/views/DashboardViewNew';
import TheatreScheduleView from '@/components/views/TheatreScheduleView';
import TomAIView from '@/components/views/TomAIView';
import TeamAssignmentView from '@/components/views/TeamAssignmentView';
import InventoryView from '@/components/views/InventoryView';
import EquipmentView from '@/components/views/EquipmentView';
import ReadinessView from '@/components/views/ReadinessView';
import AnalyticsView from '@/components/views/AnalyticsView';
import AlertsView from '@/components/views/AlertsView';
import ProceduresView from '@/components/views/ProceduresView';
import DesktopRoster from '@/features/roster/components/DesktopRoster';
import DutiesView from '@/components/views/DutiesView';
import SettingsView from '@/components/views/SettingsView';
import HelpSupportView from '@/components/views/HelpSupportView';
import HospitalSelector from '@/components/HospitalSelector';
import { ChevronDown, User, Settings, HelpCircle, LogOut, Info, Shield } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  // Secret admin access (Ctrl+1234)
  useAdminAccess();

  // Default: 'chat' (TOM AI) on mobile, 'feeds' (Posts) on desktop
  const [currentPage, setCurrentPage] = useState<'feeds' | 'chat' | 'theatres' | 'staff' | 'alerts' | 'menu'>('feeds');
  const [currentView, setCurrentView] = useState<string>('posts');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [subMenuType, setSubMenuType] = useState<'menu' | 'ops' | 'logistics' | null>(null);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showTheatreSchedule, setShowTheatreSchedule] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set initial page based on screen size after mount (client-side only)
  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768) {
      setCurrentPage('chat');
      setCurrentView('chat');
    }
  }, []);

  const handleBottomNavClick = (page: 'feeds' | 'chat' | 'theatres' | 'staff' | 'alerts' | 'menu') => {
    setCurrentPage(page);

    if (page === 'feeds') {
      setCurrentView('posts');
      setShowSubMenu(false);
    } else if (page === 'chat') {
      setCurrentView('chat');
      setShowSubMenu(false);
    } else if (page === 'theatres') {
      // Show Ops submenu on mobile
      setSubMenuType('ops');
      setShowSubMenu(true);
    } else if (page === 'staff') {
      // Show Logistics submenu on mobile
      setSubMenuType('logistics');
      setShowSubMenu(true);
    } else if (page === 'alerts') {
      setCurrentView('alerts');
      setShowSubMenu(false);
    } else if (page === 'menu') {
      setSubMenuType('menu');
      setShowSubMenu(true);
    }
  };

  const handleSubMenuNavigate = (viewId: string) => {
    if (viewId === 'profile') {
      router.push('/profile');
    } else {
      setCurrentView(viewId);
      setShowSubMenu(false); // Close the drawer after selection
    }
  };

  const handleViewBack = () => {
    // When closing a view, reopen the drawer menu (act as back button)
    if (currentPage === 'theatres') {
      setSubMenuType('ops');
      setShowSubMenu(true);
    } else if (currentPage === 'staff') {
      setSubMenuType('logistics');
      setShowSubMenu(true);
    } else {
      setCurrentView('posts');
    }
  };

  const renderContent = () => {
    // Check if a specific view is selected from Ops or Logistics submenu
    const opsViews = ['dashboard', 'theatreSchedule', 'readiness', 'analytics'];
    const logisticsViews = ['roster', 'supply', 'equipment', 'procedures-preferences'];
    const accountViews = ['settings', 'help', 'profile', 'signout'];

    // If on mobile and a specific view from submenu is selected, show that view
    if (opsViews.includes(currentView) || logisticsViews.includes(currentView) || accountViews.includes(currentView)) {
      return (
        <div className="flex flex-col h-full pb-16 overflow-hidden">
          {currentView === 'dashboard' && <DashboardViewNew onBack={handleViewBack} />}
          {currentView === 'theatreSchedule' && <TheatreScheduleView onBack={handleViewBack} />}
          {currentView === 'readiness' && <ReadinessView onBack={handleViewBack} />}
          {currentView === 'analytics' && <AnalyticsView onBack={handleViewBack} />}
          {currentView === 'roster' && <DutiesView />}
          {currentView === 'supply' && <InventoryView onBack={handleViewBack} isAdmin={false} />}
          {currentView === 'equipment' && <EquipmentView onBack={handleViewBack} />}
          {currentView === 'procedures-preferences' && <ProceduresView onBack={handleViewBack} />}
          {currentView === 'settings' && <SettingsView onBack={handleViewBack} />}
          {currentView === 'help' && <HelpSupportView onBack={handleViewBack} />}
        </div>
      );
    }

    // Theatre views - Desktop shows view based on currentView
    if (currentPage === 'theatres') {
      return (
        <div className="h-full w-full">
          {/* Desktop View - Render based on currentView */}
          <div className="hidden md:block h-full">
            {currentView === 'feeds' && <DashboardViewNew />}
            {currentView === 'theatreSchedule' && <TheatreScheduleView />}
            {currentView === 'team-assignment' && <TeamAssignmentView onBack={() => setCurrentView('feeds')} />}
            {currentView === 'supply' && <InventoryView onBack={() => setCurrentView('feeds')} isAdmin={false} />}
            {currentView === 'inventory' && <InventoryView onBack={() => setCurrentView('feeds')} isAdmin={false} />}
            {currentView === 'equipment' && <EquipmentView onBack={() => setCurrentView('feeds')} />}
            {currentView === 'readiness' && <ReadinessView onBack={() => setCurrentView('feeds')} />}
            {currentView === 'analytics' && <AnalyticsView onBack={() => setCurrentView('feeds')} />}
          </div>

          {/* Mobile View - Show message to use drawer for Ops views */}
          <div className="md:hidden h-full flex flex-col items-center justify-center bg-gray-50 pb-20 px-6">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4" style={{color: '#06B6D4'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Operations</h2>
              <p className="text-gray-600">Tap the drawer button to access Dashboard, Schedule, Cases, and more.</p>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'posts':
        return <FeedsView />;
      case 'chat':
        return (
          <div className="h-full md:pb-0">
            <TomAIView />
          </div>
        );
      case 'feeds':
        return <DashboardViewNew />;
      case 'theatreSchedule':
        return <TheatreScheduleView />;
      case 'roster':
        return <DutiesView />;
      case 'alerts':
        return <AlertsView onBack={() => setCurrentView('feeds')} />;
      case 'team-assignment':
        return <TeamAssignmentView onBack={() => setCurrentView('feeds')} />;
      case 'supply':
        return <InventoryView onBack={() => setCurrentView('feeds')} isAdmin={false} />;
      case 'inventory':
        return <InventoryView onBack={() => setCurrentView('feeds')} isAdmin={false} />;
      case 'equipment':
        return <EquipmentView onBack={() => setCurrentView('feeds')} />;
      case 'procedures':
        return <ProceduresView onBack={() => setCurrentView('feeds')} />;
      case 'readiness':
        return <ReadinessView onBack={() => setCurrentView('feeds')} />;
      case 'analytics':
        return <AnalyticsView onBack={() => setCurrentView('feeds')} />;
      default:
        return <DashboardViewNew />;
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{backgroundColor: '#F0F9FF'}}
    >
      {/* Static Staff Demo Header */}
      <div
        onClick={() => router.push('/admin')}
        className="w-full bg-teal-600 text-white flex items-center justify-center gap-3 px-4 cursor-pointer hover:bg-teal-700 transition-colors"
        style={{ height: '28px' }}
      >
        <p className="text-sm font-bold whitespace-nowrap">STAFF DEMO ACCOUNT</p>
        <p className="text-[10px] font-medium whitespace-nowrap opacity-90">Click here to switch</p>
      </div>

      {/* Header Banner - Mobile: Only on chat, Desktop: Always visible */}
      <div className={`text-white flex-shrink-0 shadow-lg ${currentView === 'chat' ? '' : 'hidden md:block'}`} style={{background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)'}}>
        <div className="px-3 md:px-6 py-2 md:py-3 flex items-center justify-between">
          {/* Left: Branding */}
          <div>
            <h1 className="text-xl font-bold">TOM by MEDASKCA</h1>
            <p className="text-sm text-white/90">Theatre Operations Manager</p>
            <p className="text-xs italic text-white/80">Demo for NHSCEP Cohort 10</p>
          </div>

          {/* Right: Hospital Selector & User Profile (Desktop Only) */}
          <div className="flex items-center gap-2">
            {/* Hospital Selector - Desktop Only */}
            <div className="hidden md:block">
              <HospitalSelector />
            </div>

            {/* User Profile - Desktop Only */}
            <div className="hidden md:block relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
            >
              {/* Profile Photo */}
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border-2 border-white/30">
                AM
              </div>

              {/* User Info */}
              <div className="text-left">
                <p className="text-sm font-bold text-white">Alexander Monterubio</p>
                <p className="text-xs text-white/70">Team Leader</p>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown className={`w-4 h-4 text-white/80 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    router.push('/profile');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors"
                >
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Profile</span>
                </button>
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Settings</span>
                </button>
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Help and Support</span>
                </button>
                <div className="border-t border-gray-200 my-2"></div>
                <button className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center space-x-3 text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header Navigation - Hidden on Mobile */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => {
                setCurrentView('posts');
                setCurrentPage('feeds');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'posts'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'posts' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView('feeds');
                setCurrentPage('theatres');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'feeds'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'feeds' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentView('theatreSchedule');
                setCurrentPage('theatres');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'theatreSchedule'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'theatreSchedule' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Schedule
            </button>
            <button
              onClick={() => {
                setCurrentView('roster');
                setCurrentPage('staff');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'roster'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'roster' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Shifts
            </button>
            <button
              onClick={() => {
                setCurrentView('procedures');
                setCurrentPage('theatres');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'procedures'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'procedures' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Cases
            </button>
            <button
              onClick={() => {
                setCurrentView('inventory');
                setCurrentPage('theatres');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'inventory'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'inventory' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Supplies
            </button>
            <button
              onClick={() => {
                setCurrentView('equipment');
                setCurrentPage('staff');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'equipment'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'equipment' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Equipment
            </button>
            <button
              onClick={() => {
                setCurrentView('readiness');
                setCurrentPage('theatres');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'readiness'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'readiness' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Readiness
            </button>
            <button
              onClick={() => {
                setCurrentView('analytics');
                setCurrentPage('theatres');
              }}
              className={`px-4 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentView === 'analytics'
                  ? 'border-transparent'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              style={currentView === 'analytics' ? {color: '#06B6D4', borderBottom: '2px solid #06B6D4'} : {}}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation - Hidden on Desktop, Shown on Mobile */}
      <div className="md:hidden">
        <BottomNav
          currentPage={currentPage}
          onNavigate={handleBottomNavClick}
          alertCount={0}
        />
      </div>

      {/* Submenu Modal */}
      <SubMenuModal
        isOpen={showSubMenu}
        onClose={() => {
          setShowSubMenu(false);
          // Return to posts view when closing drawer
          if (subMenuType === 'ops' || subMenuType === 'logistics') {
            setCurrentPage('feeds');
            setCurrentView('posts');
          }
        }}
        menuType={subMenuType}
        onNavigate={handleSubMenuNavigate}
      />

      {/* Floating Messenger - Available everywhere */}
      <FloatingMessenger currentUserId="user-1" />
    </div>
  );
}
