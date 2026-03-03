import { useState } from "react";
import Nav from "../../../components/nav/Nav";
import Header from "../../../components/header/Header";

const user = {
  name: "Amara Osei",
  email: "amara.osei@email.com",
  phone: "+234 812 345 6789",
  avatar: "AO",
  joinDate: "Member since March 2023",
  address: {
    street: "14 Sapele Road",
    city: "Benin City",
    state: "Edo State",
    zip: "300001",
    country: "Nigeria",
  },
};

const orders = [
  {
    id: "#ORD-8821",
    date: "Feb 12, 2026",
    status: "Delivered",
    total: "₦42,500",
    items: [
      { name: "Linen Oversized Shirt", qty: 1, price: "₦18,000", img: "👕" },
      { name: "Slim Chino Trousers", qty: 1, price: "₦15,500", img: "👖" },
      { name: "Leather Belt", qty: 1, price: "₦9,000", img: "👜" },
    ],
  },
  {
    id: "#ORD-7743",
    date: "Jan 28, 2026",
    status: "Delivered",
    total: "₦27,000",
    items: [
      { name: "Classic White Sneakers", qty: 1, price: "₦27,000", img: "👟" },
    ],
  },
  {
    id: "#ORD-6610",
    date: "Jan 5, 2026",
    status: "Cancelled",
    total: "₦11,200",
    items: [
      { name: "Canvas Tote Bag", qty: 2, price: "₦5,600", img: "🛍️" },
    ],
  },
  {
    id: "#ORD-5589",
    date: "Dec 18, 2025",
    status: "Delivered",
    total: "₦63,400",
    items: [
      { name: "Wool Blend Coat", qty: 1, price: "₦45,000", img: "🧥" },
      { name: "Cashmere Scarf", qty: 1, price: "₦18,400", img: "🧣" },
    ],
  },
];

const statusStyle = {
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Cancelled: "bg-red-50 text-red-600 border border-red-200",
  Processing: "bg-amber-50 text-amber-700 border border-amber-200",
  Shipped: "bg-blue-50 text-blue-700 border border-blue-200",
};

const tabs = ["Profile", "Orders", "Address", "Security"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [form, setForm] = useState({ ...user, ...user.address });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top nav bar */}

      <Header/>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
            LUMIÈRE
          </span>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
              {user.avatar}
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">{user.name}</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 mt-20">
        {/* Hero section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0" style={{ fontFamily: "Georgia, serif" }}>
            {user.avatar}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
            <p className="text-gray-400 text-xs mt-1">{user.joinDate}</p>
            <div className="flex gap-3 mt-3 justify-center sm:justify-start">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">4</div>
                <div className="text-xs text-gray-400">Orders</div>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-400">Delivered</div>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">₦144k</div>
                <div className="text-xs text-gray-400">Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-6 w-full overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "Profile" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "name", type: "text" },
                { label: "Email Address", key: "email", type: "email" },
                { label: "Phone Number", key: "phone", type: "tel" },
              ].map(({ label, key, type }) => (
                <div key={key} className={key === "email" ? "sm:col-span-1" : ""}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type={type}
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                  {user.avatar}
                </div>
                <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                  Upload Photo
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all"
              >
                Save Changes
              </button>
              {saved && (
                <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                  <span>✓</span> Saved successfully
                </span>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "Orders" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Order History</h2>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-all text-left gap-2"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
                          🛒
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                          <p className="text-xs text-gray-400">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 pl-13 sm:pl-0">
                        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusStyle[order.status]}`}>
                          {order.status}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{order.total}</span>
                        <span className="text-gray-400 text-xs">{expandedOrder === order.id ? "▲" : "▼"}</span>
                      </div>
                    </button>
                    {expandedOrder === order.id && (
                      <div className="border-t border-gray-100 bg-gray-50 p-4">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Items</p>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.img}</span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                  <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                                </div>
                              </div>
                              <p className="text-sm font-semibold text-gray-900">{item.price}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          {order.status === "Delivered" && (
                            <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition-all">
                              Write a Review
                            </button>
                          )}
                          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition-all">
                            View Receipt
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === "Address" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Street Address", key: "street", span: true },
                { label: "City", key: "city" },
                { label: "State / Region", key: "state" },
                { label: "ZIP / Postal Code", key: "zip" },
                { label: "Country", key: "country" },
              ].map(({ label, key, span }) => (
                <div key={key} className={span ? "sm:col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type="text"
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all"
              >
                Save Address
              </button>
              {saved && (
                <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                  <span>✓</span> Saved successfully
                </span>
              )}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "Security" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Change Password</h2>
              <div className="space-y-4 max-w-md">
                {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                ))}
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all"
                >
                  Update Password
                </button>
                {saved && (
                  <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                    <span>✓</span> Password updated
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h2>
              <p className="text-sm text-gray-400 mb-5">Manage what emails you receive from us.</p>
              <div className="space-y-4">
                {[
                  { label: "Order updates", desc: "Shipping and delivery notifications" },
                  { label: "Promotions & offers", desc: "Sales, discounts, and new arrivals" },
                  { label: "Account activity", desc: "Login alerts and security notices" },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-900 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-1">Danger Zone</h2>
              <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
              <button className="px-5 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
