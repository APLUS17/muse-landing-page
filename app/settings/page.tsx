'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Tab = 'account' | 'settings' | 'options';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'settings', label: 'Settings' },
    { id: 'options', label: 'Options' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'bg-white text-black' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-zinc-900 rounded-xl p-6"
        >
          {activeTab === 'account' && <AccountSection />}
          {activeTab === 'settings' && <SettingsSection />}
          {activeTab === 'options' && <OptionsSection />}
        </motion.div>
      </div>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-zinc-700"></div>
          <div>
            <p className="font-medium">Profile Picture</p>
            <button className="text-sm text-blue-400 hover:text-blue-300">Change Photo</button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Display Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-white"
            placeholder="Enter your display name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-white"
            placeholder="Enter your email"
          />
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">General Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-zinc-400">Toggle dark/light theme</p>
          </div>
          <button className="w-12 h-6 bg-blue-600 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-zinc-400">Enable push notifications</p>
          </div>
          <button className="w-12 h-6 bg-zinc-700 rounded-full relative">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Language</label>
          <select className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-white">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function OptionsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Additional Options</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Time Zone</label>
          <select className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-white">
            <option>UTC (GMT+0)</option>
            <option>EST (GMT-5)</option>
            <option>PST (GMT-8)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Date Format</label>
          <select className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-white">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="pt-4">
          <button className="text-red-400 hover:text-red-300 text-sm font-medium">
            Delete Account
          </button>
          <p className="text-xs text-zinc-400 mt-1">
            This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
} 