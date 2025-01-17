import { Col, Row, Tab } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import DashboardLayout from "../../../layouts/DashboardLayout";
import AllTime from "../../../components/dashboard/allTime";
import TodaysInsights from "../../../components/dashboard/TodaysInsights";
import RevenuesChart from "../../../components/dashboard/charts/Revenues";

const MainDashboard = () => {
    return (
        <DashboardLayout>
            <h1 className="title-h1 mb-3">Dashboard</h1>
            <div className="">
                <Tabs
                    defaultActiveKey="overview"
                    id="uncontrolled-tab-example"
                    className="tabs-secondary"
                >
                    <Tab eventKey="overview" title="Overview">
                        <div className="tab-wrap">
                            <AllTime />
                           
                            <Row className="m-0">
                                <Col className="ps-0">
                                    <TodaysInsights />
                                </Col>
                                <Col className="pe-0">
                                    <RevenuesChart/>
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey="data-analytics" title="Data & Analytics">

                    </Tab>
                    <Tab eventKey="statistics" title="Statistics">
                        Tab content for Statistics
                    </Tab>
                    <Tab eventKey="reports" title="Reports">
                        Tab content for Reports
                    </Tab>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default MainDashboard;
