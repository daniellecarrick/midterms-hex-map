import { useState, useCallback, useLayoutEffect } from "react";

//helper function to get width and height
const getElementSize = el => {
  if (!el) {
    return {
      width: 0
      // height: 0
    };
  }
  return {
    width: el.clientWidth
    // height: el.clientHeight
  };
};

const useElementSize = ref => {
  const [ElementSize, setElementSize] = useState(
    getElementSize(ref ? ref.current : {})
  );

  const handleResize = useCallback(() => {
    if (ref.current) {
      setElementSize(getElementSize(ref.current));
    }
  }, [ref]);

  const refCurrent = ref.current;

  useLayoutEffect(() => {
    if (!refCurrent) {
      return;
    }

    setTimeout(() => handleResize(), 1000);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [refCurrent, handleResize]);

  return ElementSize;
};

export default useElementSize;
