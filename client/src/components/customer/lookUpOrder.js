import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import OrderTracking from "./trackingOrder";
import useSWR from "swr";

let orID;

/**
 * React component for order lookup functionality.
 *
 * This component allows users to search for an order using its unique ID.
 * It provides an input field for users to enter the order ID and triggers a search
 * when the user clicks the "Tra cứu" (Search) button. The search results are displayed
 * using the OrderTracking component.
 *
 * @returns {JSX.Element} - The rendered React element for the LookUpOrder component.
 */
export default function LookUpOrder() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [orderID, setOrderID] = useState(searchParams.get("query") || "");
  const { data: data, error: error } = useSWR(
    `https://magicpost-uet.onrender.com/api/order/customerget/${orderID}`
  );
  // Debounced search callback to avoid rapid API calls while typing.
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
            <p>Nhập mã bưu gửi (VD:AEX451934145VN)</p>
          </Col>
        </Row>

        <Row>
          <Container>
            <Form>
              <Row>
                <Col xs="12" md="9" className="mb-2">
                  <Form.Control
                    className="rounded border"
                    required
                    onChange={(e) => (orID = e.target.value)}
                    defaultValue={searchParams.get("query")}
                  />
                </Col>

                <Col xs="12" md="3">
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
