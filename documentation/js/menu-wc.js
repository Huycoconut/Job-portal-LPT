'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic-hoidanit documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' : 'data-bs-target="#xs-controllers-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' :
                                            'id="xs-controllers-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' :
                                        'id="xs-injectables-links-module-AppModule-a0f99e35013bbf4555f738a99b8f7db56168dc0d97c5b57b04dc90390dcfeca49aa5e84cf09b0797fb05d6d3eeaf2dae416a578699be1fed7ba7b4662ed8c1d8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' :
                                            'id="xs-controllers-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' :
                                        'id="xs-injectables-links-module-AuthModule-318efd3a8d2fdff8946a60b229c332d2aa1a9638ad93902654ac353e105f771ad0bd18b1890089266afe1a94f63e5d84223473da15af3bfb7ceb9813cc879557"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' :
                                            'id="xs-controllers-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' :
                                        'id="xs-injectables-links-module-CompaniesModule-c80f4dfc3775eb6da75461233d435b6171901812cabc89645ad013ccb012e2c90e42c125f5b4d09d20fb286782349c19c742a69f8babf710f147773d071409d8"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' :
                                            'id="xs-controllers-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' :
                                        'id="xs-injectables-links-module-DatabasesModule-d36a443890a47922711a8dcf9b5c12c034641a419c3e12044c912a8c85ce53ee92fc32d20e780115daee3199264d3b7171b2261710e97ad05513fd18e5e6890f"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileModule.html" data-type="entity-link" >FileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' : 'data-bs-target="#xs-controllers-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' :
                                            'id="xs-controllers-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' }>
                                            <li class="link">
                                                <a href="controllers/FileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' : 'data-bs-target="#xs-injectables-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' :
                                        'id="xs-injectables-links-module-FileModule-aeebed096b97f6a7bee5ac95420de716957e1ace014000dc4c956bdf61c1ffdf6d49d8342e728d24f611cb8104b4e4b9357f8ef525afb23b36be1d75bc1b8bf7"' }>
                                        <li class="link">
                                            <a href="injectables/FileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' :
                                            'id="xs-controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' :
                                            'id="xs-controllers-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' :
                                        'id="xs-injectables-links-module-JobsModule-78e0cba35d7c4671d045944e1defac9120bfba1d36b39816edd5fd9ee8d75298d4c1c8f15b7c26553ba1ed591923807f1268c935c1976732b67dfa255c2e8c81"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' : 'data-bs-target="#xs-controllers-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' :
                                            'id="xs-controllers-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' : 'data-bs-target="#xs-injectables-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' :
                                        'id="xs-injectables-links-module-MailModule-118a4482be076428e2c3a370e6c5fece1fad48a4937e6f775ea6fa1a8b78f74a16899db4a1fa0b17c96b6431831b5394e6d12e9978870c10b5fe2f7624d88208"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' :
                                            'id="xs-controllers-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' :
                                        'id="xs-injectables-links-module-PermissionsModule-46032ce57a378dcb05055388f384607626916ffcd05505f0f3acb36445d444c838d02cd6dda519be2c2a8e936a7c08812604e5f106a540818b4d9ca347fba694"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' :
                                            'id="xs-controllers-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' :
                                        'id="xs-injectables-links-module-ResumesModule-da3a06f218ad3a950505c01b3d7a3a0f3e0ceefba2fc708e4e22625ebdf687db314f587f770e5c2a06d213d355c210a9ea1caf0a41945e355e46f649d3835975"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' :
                                            'id="xs-controllers-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' :
                                        'id="xs-injectables-links-module-RolesModule-533e82727e9e60943a0704dcc1f752b248a6e3d96c5699716fcec875dce081cf6d8ebbfa2dfefb326700eb2ecf1d5326714bf97fa7dbb9acc19d0cce4af05088"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubcribersModule.html" data-type="entity-link" >SubcribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' : 'data-bs-target="#xs-controllers-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' :
                                            'id="xs-controllers-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' }>
                                            <li class="link">
                                                <a href="controllers/SubcribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubcribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' : 'data-bs-target="#xs-injectables-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' :
                                        'id="xs-injectables-links-module-SubcribersModule-9338e84088a9c3de8687ffee984a71983858196d5a115cc7bb2d3c05f4a5860a3f28f7969e70571c0b2d476da59751602aa05babaf1faeb5ea00d5f27d4e618c"' }>
                                        <li class="link">
                                            <a href="injectables/SubcribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubcribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' :
                                            'id="xs-controllers-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' :
                                        'id="xs-injectables-links-module-UsersModule-83d5260df7bfa49a6361378a62401e719867adec7972148d3c5a7854be12eed8f59b85bebbdd807270f885c1c287660e91c0c7ebcd60d51a8c7e3e981c1192ba"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FileController.html" data-type="entity-link" >FileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubcribersController.html" data-type="entity-link" >SubcribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMailDto.html" data-type="entity-link" >CreateMailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubcriberDto.html" data-type="entity-link" >CreateSubcriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Jobs.html" data-type="entity-link" >Jobs</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mail.html" data-type="entity-link" >Mail</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyThrottlerGuard.html" data-type="entity-link" >MyThrottlerGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResumeHistoryDto.html" data-type="entity-link" >ResumeHistoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subcriber.html" data-type="entity-link" >Subcriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMailDto.html" data-type="entity-link" >UpdateMailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubcriberDto.html" data-type="entity-link" >UpdateSubcriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileService.html" data-type="entity-link" >FileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubcribersService.html" data-type="entity-link" >SubcribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});