"use client";

import { useState, useEffect } from "react";
import { Trash2, RefreshCw, Users, Calendar, TrendingUp, Download } from "lucide-react";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  course: string;
  message: string;
  registration_type: string;
  created_at: string | Date;
}

interface Stats {
  total: number;
  today: number;
  week: number;
  month: number;
}

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, week: 0, month: 0 });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const fetchData = async (pass: string) => {
    setLoading(true);
    setAuthError("");

    try {
      const auth = Buffer.from(`:${pass}`).toString('base64');

      // Fetch registrations
      const regResponse = await fetch('/api/admin/registrations', {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });

      if (regResponse.status === 401) {
        setAuthError("Sai mật khẩu!");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const regData = await regResponse.json();

      // Fetch stats
      const statsResponse = await fetch('/api/admin/registrations?action=stats', {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });
      const statsData = await statsResponse.json();

      setRegistrations(regData.data || []);
      setStats(statsData.data || { total: 0, today: 0, week: 0, month: 0 });
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setAuthError("Không thể kết nối đến server");
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa đăng ký này?')) return;

    try {
      const auth = Buffer.from(`:${password}`).toString('base64');
      const response = await fetch(`/api/admin/registrations?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      });

      if (response.ok) {
        setRegistrations(registrations.filter(r => r.id !== id));
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
        alert('Không thể xóa đăng ký');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Loại', 'Họ Tên', 'Email', 'Số ĐT', 'Trình độ', 'Khóa học', 'Ghi chú', 'Ngày đăng ký'];
    const rows = registrations.map(r => [
      r.id,
      r.registration_type === 'trial' ? 'Học thử' : 'Khóa học',
      r.name,
      r.email,
      r.phone,
      r.level || '',
      r.course || '',
      r.message || '',
      new Date(r.created_at).toLocaleString('vi-VN'),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-blue-200">Quản lý đăng ký học viên</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Mật khẩu Admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu..."
                required
              />
            </div>

            {authError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>

            <p className="text-sm text-gray-400 text-center">
              Mật khẩu mặc định: <code className="bg-white/10 px-2 py-1 rounded">admin123</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard Đăng Ký</h1>
              <p className="text-blue-200">Tiếng Trung Tuệ Lâm</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchData(password)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Làm mới
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                <Download className="w-4 h-4" />
                Xuất CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <Users className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.total}</div>
            <div className="text-blue-100 text-sm">Tổng đăng ký</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <Calendar className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.today}</div>
            <div className="text-green-100 text-sm">Hôm nay</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.week}</div>
            <div className="text-purple-100 text-sm">7 ngày qua</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stats.month}</div>
            <div className="text-orange-100 text-sm">30 ngày qua</div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Loại</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Họ Tên</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Số ĐT</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trình độ</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Khóa học</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ngày đăng ký</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      Đang tải...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      Chưa có đăng ký nào
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-mono text-sm">#{reg.id}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          reg.registration_type === 'trial'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                        }`}>
                          {reg.registration_type === 'trial' ? '🎁 Học thử' : '💳 Khóa học'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{reg.name}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${reg.email}`} className="text-blue-400 hover:text-blue-300">
                          {reg.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`tel:${reg.phone}`} className="text-green-400 hover:text-green-300">
                          {reg.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{reg.level || '-'}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{reg.course || '-'}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(reg.created_at).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>💾 Dữ liệu được lưu trong SQLite database tại <code className="bg-white/10 px-2 py-1 rounded">data/registrations.db</code></p>
        </div>
      </div>
    </div>
  );
}
