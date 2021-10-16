const reveal = (items, offset = 0, func) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > offset) {
                    func(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: [offset] }
    );
    items.forEach((item) => observer.observe(item));
};
export default reveal;
