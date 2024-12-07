import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
// import { useAddCourseCat } from "../../../../core/services/api/AddCourseCat";
// import { useAddBuilding } from "../../../../core/services/api/AddBuilding;

import toast from "react-hot-toast";
import { useAddBuilding } from "../../../../core/services/api/AddBuilding";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useQueryClient } from "@tanstack/react-query";

const AddCatForm = () => {
  const [coords, setCoords] = useState({
    // lat: data?.latitude,
    // lng: data?.longitude,
    lat: 36.56394435112872,
    lng: 53.058568057992765,
  });
  const formRef = useRef(null);

  const mutation = useAddBuilding();
const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formData);
    const userToast = toast.loading("درحال ساختن ساختمان  جدید");
    try {
      await mutation.mutateAsync(formValues);
      toast.success("ساختمان  با موفقیت ساخته شد!", { id: userToast });
      queryClient.invalidateQueries("Building");
    } catch (error) {
      toast.error(
        `ساخت ساختمان  با مشکل مواجه شد: 
        ${error.response.data.ErrorMessage}`,
        { id: userToast }
      );
    }
  };
  const GetCoordinates = ({ setCoords, setCortinate }) => {
    useMapEvents({
      click: (e) => {
        // console.log(e);
        const { lat, lng } = e.latlng;
        setCoords({ lat, lng });
        // setCortinate({ lat, lng });
      },
    });

    return null;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">افزودن ساختمان جدید</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit} innerRef={formRef}>
          <Row>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="buildingName">
                نام ساختمان
              </Label>
              <Input
                type="text"
                name="buildingName"
                id="buildingName"
                placeholder="نام  ساختمان را انتخاب کنید"
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="floor">
                طبقه
              </Label>
              <Input
                type="text"
                name="floor"
                id="floor"
                placeholder="طبقه  را انتخاب کنید"
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="latitude">
                عرض جغرافیایی
              </Label>
              <Input
                type="text"
                name="latitude"
                id="latitude"
                placeholder="عرض  را انتخاب کنید"
                value={coords.lng}
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="longitude">
                طول جغرافیایی
              </Label>
              <Input
                type="text"
                name="longitude"
                id="longitude"
                placeholder="طول  را انتخاب کنید"
                value={coords.lat}
              />
            </Col>
            <Col md="6" sm="6" className="mb-1">
              <Label className="form-label" for="workDate">
                تاریخ
              </Label>
              <Input
                type="date"
                name="workDate"
                id="workDate"
                placeholder="تاریخ  را انتخاب کنید"
              />
            </Col>
            <MapContainer
              // center={coords}
              center={[36.56394435112872, 53.058568057992765]}
              zoom={13}
              style={{
                height: "50vh",
                width: "100%",
                zIndex: "0",
                direction: "ltr",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <GetCoordinates
                setCoords={setCoords}
                // setCortinate={setCortinate}
              />

              <Marker position={coords}>
            {/* <Popup>A popup for the marker.</Popup> */}
          </Marker>
              {
                // markerData &&
                // markerData?.map((marker) => (
                //   <Marker
                //     key={marker?.id}
                //     position={marker?.position}
                //     eventHandlers={{
                //       click: () => setSelectedMarker(marker), // Update state on click
                //     }}
                //   >
                //     <Popup>{marker?.name}</Popup>
                //   </Marker>
                // ))
              }
            </MapContainer>

            <Col sm="12">
              <div className="d-flex justify-content-center">
                <Button className="me-1" color="success" type="submit">
                  افزودن
                </Button>
                <Button outline color="danger" type="reset">
                  لغو
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default AddCatForm;
