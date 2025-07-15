import React, { useState, useEffect, useCallback } from 'react';
import roomService from '../services/roomService';

const DashBoard = ({ setSelectedRoom, refreshTrigger }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async () => {
    try {
      const fetchedRooms = await roomService.getRooms();
      console.log('Fetched rooms:', fetchedRooms);
      setRooms(Array.isArray(fetchedRooms) ? fetchedRooms : []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch rooms. Please try again.');
      console.error('Failed to fetch rooms:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms, refreshTrigger]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Rooms</h1>
      {loading && <p className="text-gray-500">Loading rooms...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && rooms.length === 0 ? (
        <h3 className="text-center text-gray-500">No rooms added!</h3>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Room No</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Price/Night</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Occupancy</th>
              <th className="border p-2">Amenities</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border">
                <td className="border p-2">{room.roomNo}</td>
                <td className="border p-2">{room.roomType}</td>
                <td className="border p-2">${room.pricePerNight}</td>
                <td className="border p-2">{room.status}</td>
                <td className="border p-2">{room.maxOccupancy}</td>
                <td className="border p-2">{room.amenities.join(', ')}</td>
                <td className="border p-2">{room.description}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setSelectedRoom(room)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashBoard;