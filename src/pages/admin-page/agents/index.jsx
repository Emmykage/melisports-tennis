import { useState } from "react"

export default function AgentsTable() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+2348000000000",
      discount: 10,
      referralCode: "REF123",
      commissionRate: 5,
      role: "Agent",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+2348111111111",
      discount: 15,
      referralCode: "REF456",
      commissionRate: 7,
      role: "Manager",
      active: false,
    },
  ])

  const toggleActive = (id) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, active: !agent.active } : agent
      )
    )
  }

  const deleteAgent = (id) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Agents List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Referral Code</th>
              <th className="p-2 border">Commission</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Active</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="p-2 border">{agent.name}</td>
                <td className="p-2 border">{agent.email}</td>
                <td className="p-2 border">{agent.phone}</td>
                <td className="p-2 border">{agent.discount}%</td>
                <td className="p-2 border">{agent.referralCode}</td>
                <td className="p-2 border">{agent.commissionRate}%</td>
                <td className="p-2 border">{agent.role}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      agent.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {agent.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => toggleActive(agent.id)}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteAgent(agent.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
