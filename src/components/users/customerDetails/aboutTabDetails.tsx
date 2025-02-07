import { Accordion, Button, Card } from "react-bootstrap"
import { GrMap } from "react-icons/gr"

const AboutTabDetails = () => {
  return (
    <>
      <Card className='darker'>
        <Card.Body>
          <Accordion defaultActiveKey="0" flush className='accordian-detailer'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className='mb-0 small-text'>Mobile Number</p>
              </Accordion.Header>
              <Accordion.Body>
                <p>+966 512345678</p>
                <div className='optional-contact'>
                  <p className='mb-2 small-text'>Alternate Mobile Number</p>
                  <p className='mb-0'>+966 512345678</p>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      {/* second card for email */}

      <Card className='darker'>
        <Card.Body>
          <p className='mb-2 small-text'>Email</p>
          <p className='mb-0'>Selena @gmail.com</p>
        </Card.Body>
      </Card>

      {/* geneder and date of birth */}

      <div className='row'>
        <div className='col-md-6'>
          <Card className='darker'>
            <Card.Body>
              <p className='mb-2 small-text'>Gender</p>
              <p className='mb-0'>Female</p>
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-6'>
          <Card className='darker'>
            <Card.Body>
              <p className='mb-2 small-text'>Date of Birth</p>
              <p className='mb-0'>26 Jan, 1996</p>
            </Card.Body>
          </Card>

        </div>
      </div>

      {/* address details */}

      <Card className='darker'>
        <Card.Body>
          <Accordion defaultActiveKey="0" flush className='accordian-detailer'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className='mb-0 small-text'>Address</p>
              </Accordion.Header>
              <Accordion.Body>
                <div className='mb-3'>
                  <p className='mb-2'>Home</p>
                  <div className='d-flex align-items-center gap-3'>
                    <p className="mb-0">3891 Ranchview Dr. Richardson, California 62639 H.No 4, 2nd Floor Near Town hall
                    </p>
                    <Button className="border-only ms-auto">View in Map <GrMap /></Button>
                  </div>
                </div>
                <div>
                  <p className='mb-2'>Work</p>
                  <div className='d-flex align-items-center gap-3'>
                    <p>3891 Ranchview Dr. Richardson, California 62639 H.No 4, 2nd Floor Near Town hall</p>
                    <Button className="border-only ms-auto">View in Map <GrMap /></Button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
      {/* Current Location */}
      <Card className='darker'>
        <Card.Body>
          <Accordion defaultActiveKey="0" flush className='accordian-detailer'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className='mb-0 small-text'>Current Location</p>
              </Accordion.Header>
              <Accordion.Body>
                <div className='d-flex align-items-center gap-3'>
                  <p className='mb-0'>3891 Ranchview Dr. Richardson, California 62639 H.No 4, 2nd Floor Near Town hall</p>
                  <Button className="border-only ms-auto">View in Map <GrMap /></Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </>
  )

}
export default AboutTabDetails