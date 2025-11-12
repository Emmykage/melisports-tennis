import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAgents, delAgent, getAgent, getAgents, updateAgent,
} from '../../../redux/actions/agents';
import { closeLoader, setLoader } from '../../../redux/app/app';

function CreateAgentForm({ onSubmit, formData, setFormData }) {
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ agent: formData });
    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   discount: "",
    //   referral_code: "",
    //   commission: "",
    //   role: "coach",
    //   active: true,
    // })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-50 border rounded-lg mb-6"
    >
      <h3 className="text-lg font-semibold">New Agent</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="p-2 border rounded"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        <input
          className="p-2 border rounded"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
        <input
          className="p-2 border rounded"
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={(e) => handleChange('discount', e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Referral Code"
          value={formData.referral_code}
          onChange={(e) => handleChange('referral_code', e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Commission Rate (%)"
          value={formData.commission}
          onChange={(e) => handleChange('commission', e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
        >
          <option value="trainner">Trainner</option>
          <option value="coach">Coach</option>
          <option value="promoter">Brand promoter</option>

          
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => handleChange('active', e.target.checked)}
          />
          <span>Active</span>
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Agent
      </button>
    </form>
  );
}

export default function AgentsPage() {
  const dispatch = useDispatch();
  const { agents, agent, loading } = useSelector((state) => state.agent);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discount: '',
    referral_code: '',
    commission: '',
    role: 'trainner',
    active: true,
  });
  const addAgent = (agent) => {
    dispatch(setLoader(true));
    dispatch(createAgents(agent)).then((res) => {
      if (createAgents.fulfilled.match(res)) {
        dispatch(getAgents());
        setShowForm(false);
        dispatch(closeLoader());
        setFormData({
          name: '',
          email: '',
          phone: '',
          discount: '',
          referral_code: '',
          commission: '',
          role: 'trainner',
          active: true,
        });
        return;
      }
      dispatch(closeLoader());
      console.error('Failed to create agent:', res.payload || res.error);
    });
  };

  const toggleActive = (agent) => {
    dispatch(setLoader());

    dispatch(updateAgent({
      id: agent.id,
      data: {
        agent: { active: !agent.active },
      },
    })).unwrap().then(() => {
      dispatch(getAgents());
      dispatch(closeLoader());
    }).catch((err) => {
      dispatch(closeLoader());
      console.error('Failed to update agent:', err);
    });
  };

  const deleteAgent = (id) => {
    dispatch(delAgent(id)).unwrap().then(() => {
      dispatch(getAgents());
    }).catch((err) => {
      console.error('Failed to delete agent:', err);
    });
  };

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-white shadow rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-normal mb-4">Agents</h2>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? 'Close Form' : 'Create Agent'}
        </button>
      </div>

      {showForm && <CreateAgentForm onSubmit={addAgent} formData={formData} setFormData={setFormData} />}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-2 border text-gray-600">Name</th>
              <th className="p-2 border text-gray-600">Email</th>
              <th className="p-2 border text-gray-600">Phone</th>
              <th className="p-2 border text-gray-600">Discount</th>
              <th className="p-2 border text-gray-600">Referral Code</th>
              <th className="p-2 border text-gray-600">Commission</th>
              <th className="p-2 border text-gray-600">Role</th>
              <th className="p-2 border text-gray-600">Active</th>
              <th className="p-2 border text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No agents added yet.
                </td>
              </tr>
            ) : (
              agents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{agent.name}</td>
                  <td className="p-2 border">{agent.email}</td>
                  <td className="p-2 border">{agent.phone}</td>
                  <td className="p-2 border">
                    {agent.discount}
                    %
                  </td>
                  <td className="p-2 border">{agent.referral_code}</td>
                  <td className="p-2 border">
                    {agent.commission}
                    %
                  </td>
                  <td className="p-2 border">{agent.role}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        agent.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {agent.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => toggleActive(agent)}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
