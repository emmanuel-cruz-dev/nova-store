import { Card, Placeholder } from "react-bootstrap";

function OrdersSkeleton() {
  return (
    <div className="d-flex flex-column gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="shadow-sm border-0"
          style={{ borderRadius: "0.5rem", overflow: "hidden" }}
        >
          <Card.Header className="bg-white border-0 p-3">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Placeholder animation="glow">
                    <Placeholder
                      style={{
                        width: "120px",
                        height: "24px",
                        borderRadius: "4px",
                        display: "inline-block",
                      }}
                    />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder
                      style={{
                        width: "80px",
                        height: "24px",
                        borderRadius: "12px",
                        display: "inline-block",
                      }}
                    />
                  </Placeholder>
                </div>

                <Placeholder animation="glow" className="mb-2">
                  <Placeholder
                    style={{
                      width: "320px",
                      height: "16px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  />
                </Placeholder>
              </div>

              <div className="me-md-3">
                <Placeholder animation="glow">
                  <Placeholder
                    style={{
                      width: "120px",
                      height: "32px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  />
                </Placeholder>
              </div>
            </div>
          </Card.Header>
        </Card>
      ))}
    </div>
  );
}

export default OrdersSkeleton;
