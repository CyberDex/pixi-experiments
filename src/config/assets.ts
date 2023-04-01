import { ResolverManifest } from "@pixi/assets";

export const assetsManifest: ResolverManifest = {
    bundles: [
        {
            name: 'preload',
            assets: [
                {
                    name: 'spinner',
                    srcs: 'images/spinner.png',
                },
                {
                    name: 'pixi-logo',
                    srcs: 'images/pixi-logo.png',
                },
            ],
        },
        {
            name: 'game',
            assets: [
                {
                    name: 'avatar-01',
                    srcs: 'images/avatar-01.png',
                },
                {
                    name: 'avatar-02',
                    srcs: 'images/avatar-02.png',
                },
                {
                    name: 'avatar-03',
                    srcs: 'images/avatar-03.png',
                },
                {
                    name: 'avatar-04',
                    srcs: 'images/avatar-04.png',
                },
                {
                    name: 'avatar-05',
                    srcs: 'images/avatar-05.png',
                },
                {
                    name: 'bg',
                    srcs: 'images/Examples/BG.png',
                },
                {
                    name:'SmallButton-disabled', 
                    srcs: 'images/Buttons/SmallButton-disabled.png'
                },
                {
                    name:'SmallButton-hover', 
                    srcs: 'images/Buttons/SmallButton-hover.png'
                },
                {
                    name:'SmallButton', 
                    srcs: 'images/Buttons/SmallButton.png'
                },
                {
                    name:'Button-pressed', 
                    srcs: 'images/Buttons/Button-pressed.png'
                },
                {
                    name:'SmallButton-pressed', 
                    srcs: 'images/Buttons/SmallButton-pressed.png'
                },
                {
                    name:'SmallButton-substrate', 
                    srcs: 'images/Window/SmallButton-substrate.png'
                },
                {
                    name:'Button-hover', 
                    srcs: 'images/Buttons/Button-hover.png'
                },
                {
                    name:'Button-disabled', 
                    srcs: 'images/Buttons/Button-disabled.png'
                },
                {
                    name:'Button', 
                    srcs: 'images/Buttons/Button.png'
                },
                {
                    name:'ValueBG', 
                    srcs: 'images/Progress/ValueBG.png'
                },
                {
                    name:'MediumSubstrate', 
                    srcs: 'images/Window/MediumSubstrate.png'
                },
                {
                    name:'Substrate', 
                    srcs: 'images/Window/Substrate.png'
                },
                {
                    name:'MenuWindow', 
                    srcs: 'images/Window/MenuWindow.png'
                },
                {
                    name:'Ribbon', 
                    srcs: 'images/Window/Ribbon.png'
                },
                {
                    name:'Window', 
                    srcs: 'images/Window/Window.png'
                },
                {
                    name:'HomeIcon', 
                    srcs: 'images/Icons/HomeIcon.png'
                },
                {
                    name:'CloseIcon', 
                    srcs: 'images/Icons/CloseIcon.png'
                },
                {
                    name:'InfoIcon', 
                    srcs: 'images/Icons/InfoIcon.png'
                },
                {
                    name:'SmallSubstrate', 
                    srcs: 'images/Window/SmallSubstrate.png'
                },
            ],
        },
    ],
};
