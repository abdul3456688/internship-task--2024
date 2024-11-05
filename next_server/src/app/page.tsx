'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export interface Designation {
  id: string; // Unique identifier for the designation
  title: string; // Title of the designation
  description: string; // Description of the designation
  createdAt: Date; // Date when the designation was created
  updatedAt: Date; // Date when the designation was last updated
  _id?: string; // Optional field to accommodate Mongoose _id
}

export interface CreateDesignationInput {
  title: string; // Title of the designation
  description: string; // Description of the designation
}

interface Role {
  _id: string;
  roleName: string;
}

export default function RoleAndDesignationManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);

  // State for creating new roles and designations
  const [newRoleName, setNewRoleName] = useState('');
  const [newDesignationTitle, setNewDesignationTitle] = useState('');
  const [newDesignationDescription, setNewDesignationDescription] = useState('');

  // State for managing edit mode
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [editingDesignationId, setEditingDesignationId] = useState<string | null>(null);
  const [editingRoleName, setEditingRoleName] = useState('');
  const [editingDesignationTitle, setEditingDesignationTitle] = useState('');
  const [editingDesignationDescription, setEditingDesignationDescription] = useState('');

  // State for toggling create modes
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [isCreatingDesignation, setIsCreatingDesignation] = useState(false);

  const { data: rolesData, isLoading: loadingRoles, isError: errorRoles, refetch: refetchRoles } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/v1/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      return response.json();
    },
  });

  const { data: designationsData, isLoading: loadingDesignations, isError: errorDesignations, refetch: refetchDesignations } = useQuery<Designation[]>({
    queryKey: ['designations'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/v1/designations');
      if (!response.ok) throw new Error('Failed to fetch designations');
      return response.json();
    },
  });

  useEffect(() => {
    if (rolesData) setRoles(rolesData);
    if (designationsData) setDesignations(designationsData);
  }, [rolesData, designationsData]);

  const handleCreateRole = async () => {
    const response = await fetch('http://localhost:3000/v1/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleName: newRoleName }),
    });
    if (response.ok) {
      setNewRoleName('');
      setIsCreatingRole(false);
      refetchRoles();
    }
  };

  const handleCreateDesignation = async () => {
    const response = await fetch('http://localhost:3000/v1/designations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newDesignationTitle, description: newDesignationDescription }),
    });
    if (response.ok) {
      setNewDesignationTitle('');
      setNewDesignationDescription('');
      setIsCreatingDesignation(false);
      refetchDesignations();
    }
  };

  const handleUpdateRole = async (id: string) => {
    const response = await fetch(`http://localhost:3000/v1/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleName: editingRoleName }),
    });
    if (response.ok) {
      setEditingRoleId(null);
      setEditingRoleName('');
      refetchRoles();
    }
  };

  const handleUpdateDesignation = async (id: string) => {
    const response = await fetch(`http:// localhost:3000/v1/designations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingDesignationTitle, description: editingDesignationDescription }),
    });
    if (response.ok) {
      setEditingDesignationId(null);
      setEditingDesignationTitle('');
      setEditingDesignationDescription('');
      refetchDesignations();
    }
  };

  const handleDeleteRole = async (id: string) => {
    const response = await fetch(`http://localhost:3000/v1/roles/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) refetchRoles();
  };

  const handleDeleteDesignation = async (id: string) => {
    const response = await fetch(`http://localhost:3000/v1/designations/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) refetchDesignations();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Role Management Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Role Management</h1>
          <Button onClick={() => setIsCreatingRole(!isCreatingRole)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isCreatingRole ? 'Cancel' : 'Create New Role'}
          </Button>
        </div>
        
        {isCreatingRole && (
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <Input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Enter new role name"
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <Button onClick={handleCreateRole} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </Button>
          </div>
        )}

        {loadingRoles && <div>Loading roles...</div>}
        {errorRoles && <div style={{ color: 'red' }}>Error fetching roles</div>}

        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {roles.map((role) => (
            <Card key={role._id} style={{ padding: '20px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {editingRoleId === role._id ? (
                <Input
                  type="text"
                  value={editingRoleName}
                  onChange={(e) => setEditingRoleName(e.target.value)}
                  placeholder="Enter new role name"
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              ) : (
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{role.roleName}</h2>
              )}
              {editingRoleId === role._id ? (
                <Button onClick={() => handleUpdateRole(role._id)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Save
                </Button>
              ) : (
                <Button onClick={() => {
                  setEditingRoleId(role._id);
                  setEditingRoleName(role.roleName);
                }} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Edit
                </Button>
              )}
              <Button onClick={() => handleDeleteRole(role._id)} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Designation Management Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: ' 20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Designation Management</h1>
          <Button onClick={() => setIsCreatingDesignation(!isCreatingDesignation)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isCreatingDesignation ? 'Cancel' : 'Create New Designation'}
          </Button>
        </div>
        
        {isCreatingDesignation && (
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <Input
              type="text"
              value={newDesignationTitle}
              onChange={(e) => setNewDesignationTitle(e.target.value)}
              placeholder="Enter designation title"
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <Input
              type="text"
              value={newDesignationDescription}
              onChange={(e) => setNewDesignationDescription(e.target.value)}
              placeholder="Enter designation description"
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <Button onClick={handleCreateDesignation} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </Button>
          </div>
        )}

        {loadingDesignations && <div>Loading designations...</div>}
        {errorDesignations && <div style={{ color: 'red' }}>Error fetching designations</div>}

        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {designations.map((designation) => (
            <Card key={designation._id} style={{ padding: '20px', borderRadius: '4px', border: '1px solid #ccc' }}>
              {editingDesignationId === designation._id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Input
                    type="text"
                    value={editingDesignationTitle}
                    onChange={(e) => setEditingDesignationTitle(e.target.value)}
                    placeholder="Enter designation title"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  <Input
                    type="text"
                    value={editingDesignationDescription}
                    onChange={(e) => setEditingDesignationDescription(e.target.value)}
                    placeholder="Enter designation description"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
              ) : (
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{designation.title}</h2>
                  <p style={{ fontSize: '16px' }}>{designation.description}</p>
                </div>
              )}
              {editingDesignationId === designation._id ? (
                <Button onClick={() => handleUpdateDesignation(designation.id)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Save
                </Button>
              ) : (
                <Button onClick={() => {
                  setEditingDesignationId(designation.id);
                  setEditingDesignationTitle(designation.title);
                  setEditingDesignationDescription(designation.description);
                }} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Edit
                </Button>
              )}
              <Button onClick={() => handleDeleteDesignation(designation.id)} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}