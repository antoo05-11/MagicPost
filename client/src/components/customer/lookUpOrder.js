import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import OrderTracking from "./trackingOrder";
import { getOrderTracking } from "@/api/data";
let orID;
export default function LookUpOrder() {
  // AEX451934145VN
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [orderID, setOrderID] = useState(searchParams.get("query") || "");
  const { data: data, error: error } = getOrderTracking(orderID);
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setOrderID(term);
  });

  return (
    <>
      <Container className="lookUpContainer">
        <Row>
          <Col>
            <HiOutlineDocumentSearch size={"2rem"} />
            <p>Nhập mã bưu gửi (VD: EB125966888VN)</p>
          </Col>
        </Row>

        <Row>
          <Container>
            <Form>
              <Row>
                <Col xs="9">
                  <Form.Control
                    className="rounded border"
                    required
                    onChange={(e) => (orID = e.target.value)}
                    defaultValue={searchParams.get("query")}
                  />
                </Col>

                <Col>
                  <Button className="w-100" onClick={() => handleSearch(orID)}>
                    Tra cứu
                  </Button>
                </Col>
              </Row>

              <Row>
                {data?.error && (
                  <p className="text-danger  m-0">Không tìm thấy bưu gửi</p>
                )}
              </Row>
            </Form>
          </Container>
        </Row>
      </Container>

      {data && <OrderTracking data={data.order} />}
    </>
  );
}
