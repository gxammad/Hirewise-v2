import Wrapper from "@/layout/wrapper";
import CounterMain from "@/components/all-counters";

export const metadata = {
  title: "Counter Page - Restly",
};

const CounterPage = () => {
  return (
    <Wrapper>
      <CounterMain />
    </Wrapper>
  );
};

export default CounterPage;
