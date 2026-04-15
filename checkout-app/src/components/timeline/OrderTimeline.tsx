import { useOrderStore } from "../../domains/order/order.store";

export default function OrderTimeline() {
  const state = useOrderStore((s) => s.state);

  return <div className="mt-4">Current State: {state}</div>;
}