import { useEffect } from "react";
const useOnScrollNavbarAnimation = (scrollRef) => {
  let prevScrollPos = window.pageYOffset;

  const animateNavbar = () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > prevScrollPos) {
      scrollRef.current.style.top = "-4rem";
    } else {
      scrollRef.current.style.top = "0";
    }
    prevScrollPos = currentScrollPos;
  };

  useEffect(() => {
    (() => {
      window.addEventListener("scroll", animateNavbar);
    })();
  });
};
export default useOnScrollNavbarAnimation;
