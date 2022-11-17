import { useState } from "react";

const withCounter2 = ( WrappedComponent ) => {
      const WithCounter2 = () => {
        const [count, setCount] = useState(0);

        const incrementCount = () => {
          setCount(count + 1);
        };

        return <WrappedComponent count={count} incrementCount={incrementCount} />;
      };

    return WithCounter2
  }

export default withCounter2;
