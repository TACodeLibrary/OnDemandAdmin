import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getFormattedDateTime } from "../../../helpers";
import { RootState } from "../../../rtk/store";
import { useSelector } from "react-redux";
import { aesDecrypt } from "../../../utils/aes-encrypt-decrypt";
import { sunImg, moonImg } from "../../../utils/images";


const LandingDashboard = () => {
    const [dateTime, setDateTime] = useState<{ date: string; time: string }>({
        date: "",
        time: "",
    });
    const [greeting, setGreeting] = useState<string>("Good Morning");
    const auth = useSelector((state: RootState) => state.auth);
    const [timeImage, setTimeImage] = useState(sunImg);

    useEffect(() => {
        const updateDateTime = () => {
            const currentDateTime = getFormattedDateTime();
            setDateTime(currentDateTime);

            // Get current hour from Date object
            const currentHour = new Date().getHours();

            // Set greeting and image based on time
            if (currentHour < 12) {
                setGreeting("Good Morning");
                setTimeImage(sunImg);
            } else {
                setGreeting("Good Evening");
                setTimeImage(moonImg);
            }
        };

        updateDateTime(); // Initial update
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <DashboardLayout>
            <div className="main-content">
                <Card className="dark mb-0 h-100">
                    <Card.Body>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="left-time-zone">
                                {dateTime.date}, {dateTime.time}
                            </p>
                            <p className="right-temprature-zone"> 21deg</p>
                        </div>
                        <div className="morning-text">
                            <div className="text-wrap-center">
                                <div className="big-text">
                                    <h1 className="mb-0">{greeting}
                                        <span className="text-capitalize">{aesDecrypt(auth?.data?.user?.first_name)}</span>
                                    </h1>
                                    <img src={timeImage} />
                                </div>
                                <div className="info-bar">
                                    <p>23 Notifications</p>
                                    <p>13 Messages</p>
                                    <p>7 Tasks</p>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default LandingDashboard;
