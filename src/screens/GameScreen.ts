import { AppScreen } from '../components/basic/AppScreen';
import { SmallIconButton } from '../components/SmallIconButton';
import { game, SceneData } from '../Game';
import { TitleScreen } from './TitleScreen';
import { Windows } from '../config/windows';
import { InfoWindow } from '../components/windows/InfoWindow';

/** Game screen. 
 * To be used to show all the game play and UI.
*/
export class GameScreen extends AppScreen { // GameScreen extends AppScreen, which is a Layout with a few additional features
    public static assetBundles = ['game']; // asset bundles that will be loaded before the screen is shown

    constructor(options: SceneData) { // constructor accepts an object with data that will be passed to the screen when it is shown
        super('GameScreen'); // Creates Layout with id 'GameScreen'

        game.addBG(); 
        
        this.addBackButton(); // add pause button component to the screen
        this.addInfoButton(); // add pause button component to the screen

        this.createWindows(options?.window); // create windows
    }

    /** Create windows. 
     * Windows are Layout based components that are shown on top of the screen.
    */
    private createWindows(
        activeWindow?: Windows // active window to show
        ) { 
        this.addWindow(Windows.info, new InfoWindow(this.views)); // create InfoWindow

        this.showActiveWindow(activeWindow); // show active window
    }

    /** Add pause button component to the screen.
     * Pause button suits to pause the game and show the pause window and the title screen.
     */
    private addBackButton() {
        const button = new SmallIconButton('ExitIcon', () => { // create a button with a custom icon
            game.showScreen( // show TitleScreen with default window (pauseWindow) opened
                TitleScreen, // screen to show
                {
                    window: Windows.pause // show screen with PauseWindow opened
                }
            ); 
        });

        this.addContent({ // add content to the screen layout
            content: button,
            styles: { // set styles for the button block
                position: 'top', // position the button in the bottom right corner of the parent
                scale: 0.35, // scale button 0.5 times
                maxWidth: '20%', // set max width to 20% of the parent width so the layout witt scale down if the screen width is too small to fit it
                maxHeight: '20%', // set max height to 20% of the parent height so the layout witt scale down if the screen height is too small to fit it
                // as button anchor is 0.5, we want to compensate it's offsets:
                // -30 is a compensation of the button anchor offset
                // +10 is actually a margin we want to have between the button and the parent edge
                marginLeft: 30 + 10, // move the button 10px to the right
                marginTop: 30 + 10, // move the button 10px down
            },
        });
    }

    private addInfoButton() {
        const button = new SmallIconButton('InfoIcon', () => { // create a button with a custom icon
            this.views.show(Windows.info);
        });

        this.addContent({ // add content to the screen layout
            content: button,
            styles: { // set styles for the button block
                position: 'topRight', // position the button in the bottom right corner of the parent
                scale: 0.35, // scale button 0.5 times
                maxWidth: '20%', // set max width to 20% of the parent width so the layout witt scale down if the screen width is too small to fit it
                maxHeight: '20%', // set max height to 20% of the parent height so the layout witt scale down if the screen height is too small to fit it
                // as button anchor is 0.5, we want to compensate it's offsets:
                // -30 is a compensation of the button anchor offset
                // +10 is actually a margin we want to have between the button and the parent edge
                marginRight: -30 + 10, // move the button 10px to the right
                marginTop: 30 + 10, // move the button 10px down
            },
        });
    }

    /** Method that is called one every game tick (see Game.ts) */
    onUpdate() {

    }
}
