const stickyHeaderApp = () => {
    const scrollToTop = () => {
        const offset = window.screen.availHeight / 2;
        const button = document.createElement('button');
        button.classList.add('toTop');
        button.innerText = '^';
        document.body.append(button);
        const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        const isButtonShown = button.classList.contains('show');
        button.addEventListener('click', scrollTop);
        window.addEventListener('scroll', () => {
            (window.scrollY > offset) ? 
                (!isButtonShown && button.classList.add('show')) : 
                button.classList.remove('show');
        })
    }
    
    const stickyHeader = () => {
        const header = document.querySelector('.header');
        const offset = header.clientHeight + (header.clientHeight / 2);
        let lastPosition;
        const headerAction = (action = 'show') => {
            return (action === 'hide') ?
                header.classList.remove('hidden') :
                header.classList.add('hidden');
        }
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            const isOffsetMore = scroll > offset;
            const isScrollTop = scroll < lastPosition;
            const isHeaderHidden = header.classList.contains('hidden');
            lastPosition = scroll;
            return (isOffsetMore && !isScrollTop) ?
                (!isHeaderHidden && headerAction('show')) :
                (
                    (isOffsetMore && isScrollTop) &&
                    (isHeaderHidden && headerAction('hide'))
                );
        });
    }

    scrollToTop();
    stickyHeader();
}

stickyHeaderApp();
