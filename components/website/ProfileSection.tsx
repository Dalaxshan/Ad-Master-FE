"use client";

import { useState } from 'react';
import { Heart, Bell, Settings, LogOut, Plus, Eye, Clock, ChevronRight, Star, Shield, Edit2 } from 'lucide-react';
import AdCard from './AdCard';
import { ads } from '@/data/ads';
import Link from 'next/link';


const tabs = [
  { id: 'my-ads', label: 'My Ads', icon: <Eye size={16} /> },
  { id: 'saved', label: 'Saved Ads', icon: <Heart size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
];

const notifications = [
  { id: 1, type: 'message', text: 'You have a new message from Suresh about your iPhone listing', time: '5 min ago', read: false },
  { id: 2, type: 'view', text: 'Your ad "Dell XPS 15" received 23 new views today', time: '1 hour ago', read: false },
  { id: 3, type: 'offer', text: 'Someone made an offer on your Toyota Aqua listing', time: '3 hours ago', read: true },
  { id: 4, type: 'system', text: 'Your featured ad will expire in 2 days. Renew now for continued visibility.', time: '1 day ago', read: true },
];

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState('my-ads');
  const myAds = ads.slice(0, 4);
  const savedAds = ads.slice(4, 8);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1a237e] to-[#3949ab] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    K
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Edit2 size={12} className="text-[#1a237e]" />
                  </button>
                </div>
                <h2 className="font-bold text-gray-900">Kamal Perera</h2>
                <p className="text-sm text-gray-500">kamal@example.com</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} fill={i <= 4 ? '#f59e0b' : 'none'} className={i <= 4 ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.2 (18)</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Shield size={13} className="text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Verified Member</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                  <Clock size={11} /> Member since Jan 2021
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-gray-100 text-center">
                <div>
                  <p className="font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">48</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">3.2K</p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors border-b border-gray-50 last:border-0 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-[#1a237e] border-l-2 border-l-[#1a237e]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-[#1a237e]' : 'text-gray-400'}>{tab.icon}</span>
                  {tab.label}
                  {tab.id === 'notifications' && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
                  )}
                  <ChevronRight size={14} className={`ml-auto ${activeTab === tab.id ? 'text-[#1a237e]' : 'text-gray-300'}`} />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === 'my-ads' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900">My Ads</h2>
                  <Link
                    href="/ad"
                    className="flex items-center gap-2 bg-[#1a237e] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#283593] transition-colors"
                  >
                    <Plus size={16} /> Post New Ad
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Active Ads', value: '12', color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Pending Review', value: '2', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { label: 'Expired', value: '3', color: 'text-red-500', bg: 'bg-red-50' },
                  ].map(s => (
                    <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {myAds.map(ad => <AdCard key={ad.id} ad={ad} layout="grid" />)}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Saved Ads</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAds.map(ad => <AdCard key={ad.id} ad={ad} layout="grid" />)}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <button className="text-sm text-[#1a237e] font-medium hover:underline">Mark all as read</button>
                </div>
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n.id} className={`bg-white border rounded-xl p-4 flex gap-3 ${!n.read ? 'border-blue-100' : 'border-gray-100'}`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg ${
                        n.type === 'message' ? 'bg-blue-50' :
                        n.type === 'view' ? 'bg-green-50' :
                        n.type === 'offer' ? 'bg-yellow-50' : 'bg-gray-50'
                      }`}>
                        {n.type === 'message' ? '💬' : n.type === 'view' ? '👁️' : n.type === 'offer' ? '💰' : '🔔'}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-[#1a237e] rounded-full mt-2 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Account Settings</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-100 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', value: 'Kamal Perera', type: 'text' },
                        { label: 'Email', value: 'kamal@example.com', type: 'email' },
                        { label: 'Phone', value: '071 234 5678', type: 'tel' },
                        { label: 'District', value: 'Colombo', type: 'text' },
                      ].map(field => (
                        <div key={field.label}>
                          <label className="block text-sm font-medium text-gray-600 mb-1.5">{field.label}</label>
                          <input
                            type={field.type}
                            defaultValue={field.value}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a237e]"
                          />
                        </div>
                      ))}
                    </div>
                    <button className="mt-5 bg-[#1a237e] hover:bg-[#283593] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
                      Save Changes
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-3">
                      {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                        <div key={label}>
                          <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a237e]" />
                        </div>
                      ))}
                    </div>
                    <button className="mt-5 bg-[#1a237e] hover:bg-[#283593] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
                      Update Password
                    </button>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Email notifications for new messages', defaultChecked: true },
                        { label: 'SMS alerts for offers', defaultChecked: false },
                        { label: 'Weekly digest emails', defaultChecked: true },
                        { label: 'Promotional offers', defaultChecked: false },
                      ].map(pref => (
                        <label key={pref.label} className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700">{pref.label}</span>
                          <input type="checkbox" defaultChecked={pref.defaultChecked} className="w-4 h-4 accent-[#1a237e]" />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                    <h3 className="font-semibold text-red-700 mb-1">Danger Zone</h3>
                    <p className="text-sm text-red-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
                    <button className="border border-red-300 text-red-600 font-semibold px-5 py-2 rounded-xl text-sm hover:bg-red-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
