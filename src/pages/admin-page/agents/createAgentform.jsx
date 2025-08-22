import { useState } from "react"

export default function CreateAgentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    discount: "",
    referralCode: "",
    commissionRate: "",
    role: "agent",
    active: true,
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Agent Created:", formData)
    // TODO: send formData to your API
  }


  return (
    <div className="max-w-xl mx-auto mt-6 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Create New Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Agent Full Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            placeholder="agent@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            placeholder="+234 800 000 0000"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. 10"
            value={formData.discount}
            onChange={(e) => handleChange("discount", e.target.value)}
          />
        </div>

        {/* Referral Code */}
        <div>
          <label className="block text-sm font-medium mb-1">Referral Code</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Unique referral code"
            value={formData.referralCode}
            onChange={(e) => handleChange("referralCode", e.target.value)}
          />
        </div>

        {/* Commission Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. 5"
            value={formData.commissionRate}
            onChange={(e) => handleChange("commissionRate", e.target.value)}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="agent">Agent</option>
            <option value="sub-agent">Sub-Agent</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Active</label>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={formData.active}
            onChange={(e) => handleChange("active", e.target.checked)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Agent
        </button>
      </form>
    </div>
  )
}
