import { AppScreen } from '../components/basic/AppScreen';
import { SmallIconButton } from '../components/SmallIconButton';
import { game, SceneData } from '../Game';
import { TitleScreen } from './TitleScreen';
import { Windows } from '../config/windows';
import { InfoWindow } from '../components/windows/InfoWindow';
import {challenges} from '../config/challenges';
import { SpritesGame } from '../games/Sprites';
import { EmojiGame } from '../games/EmojiGame';
import { FireGame } from '../games/FireGame';
import { IGame } from '../games/IGame';

/** Game screen. 
 * To be used to show all the game play and UI.
*/
export class GameScreen extends AppScreen { // GameScreen extends AppScreen, which is a Layout with a few additional features
    public static assetBundles = ['game']; // asset bundles that will be loaded before the screen is shown
    private gameType: string = 'sprites'; // game type
    private game!: IGame; // game instance

    constructor(options?: SceneData) { // constructor accepts an object with data that will be passed to the screen when it is shown
        super('GameScreen'); // Creates Layout with id 'GameScreen'

        game.addBG(); 
        
        if (options?.type) { 
            this.gameType = options?.type; // set game type
        }

        this.createGame(); // create game

        this.addBackButton(); // add pause button component to the screen

        this.createWindows(options?.window); // create windows
    }

    /** Create windows. 
     * Windows are Layout based components that are shown on top of the screen.
    */
    private createWindows(
        activeWindow?: Windows // active window to show
        ) { 

        const task = challenges[this.gameType];

        if (task) {
            this.addWindow(Windows.info, new InfoWindow(this.views, task)); // create InfoWindow

            this.addInfoButton(); // add info button component to the screen

            this.showActiveWindow(activeWindow); // show active window
        }
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
                marginLeft: 55, // move the button 10px to the right
                marginTop: 55, // move the button 10px down
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
                marginRight: 0, // move the button 10px to the right
                marginTop: 55, // move the button 10px down
            },
        });
    }

    /** Create game. */
    private createGame() {
        switch (this.gameType) {
            case 'sprites':
                this.game = new SpritesGame(this);
            break;
            case 'textAndImages':
                this.game = new EmojiGame(this);                
            break;
            case 'particlesFire':
                this.game = new FireGame(this);
                break;
        }
    }

    /** Method that is called one every game tick (see Game.ts) */
    onUpdate() {
        if (this.game?.update) {
            this.game.update();
        }
    }

    override resize(width: number, height: number) {
        super.resize(width, height);

        if (this.game?.resize) {
            this.game.resize(width, height);
        }
    };
}
