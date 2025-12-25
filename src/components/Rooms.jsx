    import { useEffect, useState, useMemo } from "react";
    // import axios from "axios";
    import API from "../api";
    const Rooms = () => {
        const [roomsData, setRoomsData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [search, setSearch] = useState("");
        const [selectedFloor, setSelectedFloor] = useState("all");
        const [roomOptions, setRoomOptions] = useState({});
        const fetchRoomsByFloor = async (studentID, floorNo) => {
            if (!floorNo) return;
            try {
                const res = await API.get(`/api/rooms/by-floor/${floorNo}`);
                setRoomOptions((prev) => ({
                    ...prev,
                    [studentID]: res.data.data || [],
                }));
            } catch (err) {
                console.error("Error fetching Rooms Nums: ", err);
            }
        };
        useEffect(() => {
            API.get("/api/rooms")
                .then((res) => {
                    console.log("Rooms API response:", res.data); 
                    const data = res.data.data;
                    setRoomsData(data);

                    // preload roomOptions for students who already have a floor
                    data.forEach((row) => {
                        if (row.floorNo) {
                            fetchRoomsByFloor(row.studentID, row.floorNo);
                        }
                    });

                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching Rooms:", err);
                    setLoading(false);
                });
        }, []);


        /* 🔍 Search + Floor filter */
        const filteredData = useMemo(() => {
            if (!Array.isArray(roomsData)) return [];
            return roomsData.filter((row) => {
                const fullName = `${row.FirstName} ${row.LastName}`.toLowerCase();
                const matchesSearch =
                    fullName.includes(search.toLowerCase()) ||
                    row.enrollmentNo.toLowerCase().includes(search.toLowerCase());

                const matchesFloor =
                    selectedFloor === "all" ||
                    String(row.floorNo) === selectedFloor;

                return matchesSearch && matchesFloor;
            });
        }, [roomsData, search, selectedFloor]);

        if (loading) return <p>Loading room allocations...</p>;

        return (
            <div className="rooms-page">
                <h2 className="font-hero text-6xl font-extrabold text-[#00D974]" style={{ textAlign: "center" }}> Student Room Allocation</h2>

                {/* Controls */}
                <div className="rooms-controls">
                    <input
                        type="text"
                        placeholder="Search by name or enrollment"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* ✅ EXACTLY 3 FLOORS */}
                    <select
                        value={selectedFloor}
                        onChange={(e) => setSelectedFloor(e.target.value)}
                    >
                        <option value="all">All Floors</option>
                        <option value="1">Floor 1</option>
                        <option value="2">Floor 2</option>
                        <option value="3">Floor 3</option>
                    </select>
                </div>

                {/* Table */}
                <table className="rooms-table">
                    <thead>
                        <tr>
                            <th>Enrollment No</th>
                            <th>Student Name</th>
                            <th>Floor</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.studentID}>
                                <td>{row.enrollmentNo}</td>
                                <td>{row.FirstName} {row.LastName}</td>
                                <td>
                                    <select
                                        className="floor-select"
                                        value={row.floorNo ?? ""}
                                        onChange={(e) => {
                                            const newFloor = Number(e.target.value);

                                            // update roomsData
                                            setRoomsData((prev) =>
                                                prev.map((r) =>
                                                    r.studentID === row.studentID
                                                        ? { ...r, floorNo: newFloor, roomNo: null }
                                                        : r
                                                )
                                            );

                                            fetchRoomsByFloor(row.studentID, newFloor);
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>

                                </td>
                                <td>
                                    <select
                                        className="room-select"
                                        disabled={!roomOptions[row.studentID] || roomOptions[row.studentID].length === 0}
                                        value={row.roomNo ?? ""}
                                        onChange={(e) => {
                                            const newRoom = e.target.value;

                                            setRoomsData((prev) =>
                                                prev.map((r) =>
                                                    r.studentID === row.studentID
                                                        ? { ...r, roomNo: newRoom }
                                                        : r
                                                )
                                            );
                                        }}
                                    >
                                        <option value="">Select Room</option>

                                        {roomOptions[row.studentID]?.map((room) => (
                                            <option
                                                key={room.hostelRoomID}
                                                value={String(room.hostelRoomID)}
                                            >
                                                {room.roomNo}
                                            </option>

                                        ))}
                                    </select>

                                </td>
                            </tr>
                        ))}

                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", opacity: 0.7 }}>
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="allocate-bar">
                    <button
                        className="allocate-btn"
                        onClick={async () => {
                            try {
                                // Build array for SP
                                const allocations = roomsData
                                    .filter(r => r.floorNo && r.roomNo) // only allocated rooms
                                    .map(r => ({
                                        studentID: r.studentID,
                                        floorID: r.floorNo,
                                        roomID: r.roomNo
                                    }));

                                if (allocations.length === 0) {
                                    alert("No rooms selected!");
                                    return;
                                }
                                console.log("Allocations to send:", allocations);
                                await API.post("/api/rooms/allocate", allocations);

                                alert("Rooms allocated successfully!");
                            } catch (err) {
                                console.error(err);
                                alert("Failed to allocate rooms");
                            }
                        }}
                    >
                        Allocate Room
                    </button>
                </div>
            </div>
        );
    };

    export default Rooms;
