import React from 'react';
import Sidenav from './navbar/Sidenav';
import Chathome from './components/chat/Chathome';
import PetDashboard from './components/pet_details';
import MapDashboard from './components/map_feature/MapDashboard';
import NewsDashboard from './components/news_feature/NewsDashboard';
import Reminders from './components/reminders/reminder';
import { Route, Routes } from 'react-router-dom';
import Forum from './components/forum/forum';
import Thread from './components/forum/thread'; // Import Thread component
import CreateThread from './components/forum/createthread';


export const Homepage = () => {
    return (
        <div>
            <Sidenav />
            <Routes>
                <Route path="/" element={<PetDashboard />} />
                <Route path="/chat" element={<Chathome />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/map" element={<MapDashboard />} />
                <Route path="/news" element={<NewsDashboard />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/forum/:id" element={<Thread />} /> {/* Match the route pattern */}
                <Route path="/create-thread" element={<CreateThread />} />
            </Routes>
        </div>
    )
}

export default Homepage;
