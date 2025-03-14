import './RightSidebar.css';
import { useState } from 'react';

function RightSidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Your order has been shipped!', isRead: false, time: '10:00 AM, March 5, 2025' },
        { id: 2, message: 'You have a new message.', isRead: false, time: '11:00 AM, March 5, 2025' },
        { id: 3, message: 'System update available.', isRead: false, time: '1:00 PM, March 5, 2025' },
        { id: 4, message: 'New comment on your post.', isRead: false, time: '2:30 PM, March 5, 2025' },
        { id: 5, message: 'New comment on your post.', isRead: false, time: '3:15 PM, March 5, 2025' },
    ]);

    const [recentActivities, setRecentActivities] = useState([
        { activity: 'Logged in', time: '10:00 AM, March 5, 2025' },
        { activity: 'Password changed', time: '9:45 AM, March 5, 2025' },
        { activity: 'New comment on your post', time: '11:30 AM, March 5, 2025' },
        { activity: 'New comment on your post', time: '11:30 AM, March 5, 2025' },
        { activity: 'New comment on your post', time: '11:30 AM, March 5, 2025' },
        { activity: 'New comment on your post', time: '11:30 AM, March 5, 2025' },
        { activity: 'New comment on your post', time: '11:30 AM, March 5, 2025' },
    ]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className={`Right-Sidebar-Component ${isSidebarOpen ? 'Right-Sidebar-Open' : 'Right-Sidebar-Closed'}`}>
            <button className="Right-Sidebar-Toggle-Button" onClick={toggleSidebar}>
                {isSidebarOpen ? '→' : '←'}
            </button>

            <div className='Right-Sidebar-Contents'>

                <h2 className="Right-Sidebar-Section-Heading">Notifications</h2>
                <div className="Right-Sidebar-Notifications-Container">
                    <div className="Right-Sidebar-Notifications-List">
                        {notifications.map(notification => (
                            <div key={notification.id} className="Right-Sidebar-Notification-Item">
                                <div className="Right-Sidebar-Notification-Content">
                                    <span className="Right-Sidebar-Notification-Icon">🔔</span>
                                    <p className="Right-Sidebar-Notification-Message">{notification.message}</p>
                                </div>
                                <div className="Right-Sidebar-Notification-Time">
                                    <span>{notification.time}</span>
                                </div>
                                <div className="Right-Sidebar-Notification-Actions">
                                    <button className="Right-Sidebar-Action-Button">Button 1</button>
                                    <button className="Right-Sidebar-Action-Button">Button 2</button>
                                    <button
                                        className="Right-Sidebar-Close-Button"
                                        onClick={() => removeNotification(notification.id)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="Right-Sidebar-Section-Heading-Recent">Recent Activities</h2>
                <div className="Right-Sidebar-Recent-Activities-Container">
                    <div className="Right-Sidebar-Recent-Activities-List">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="Right-Sidebar-Recent-Activity-Item">
                                <span className="Right-Sidebar-Recent-Activity-Icon">📅</span>
                                <p className="Right-Sidebar-Recent-Activity-Message">{activity.activity}</p>
                                <div className="Right-Sidebar-Recent-Activity-Time">
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default RightSidebar;
