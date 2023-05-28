
const App = {
    name: 'KeepInTouch',
    show: new Event('show'),

    init () {
        document.querySelector('.page#app').addEventListener('show', App.loading);
        history.replaceState({}, 'log-in', `#log-in`);
        window.addEventListener('popstate', App.popState);
    }, 

    loading() {
        
    },

    popState () {
        const hash = location.hash.replace('#' ,'');
        App.display(hash);
    },

    nav (event) {
        event.preventDefault();

        const currentPage = event.target.getAttribute('data-target');
        if (currentPage === 'app') {
            searchConcats();
            loadProfile();
        }

        window.history.pushState({}, currentPage, `#${currentPage}`);
        App.display(currentPage);
    },

    display (currentPage) {
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        document.getElementById(currentPage).dispatchEvent(App.show);
    }

}

document.addEventListener('DOMContentLoaded', App.init);