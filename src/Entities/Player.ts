import { Application, UPDATE_PRIORITY, Container, Spritesheet, TextStyle, Text, Rectangle, Graphics, Filter } from "pixi.js";
import { SpriteAnimation } from "../SpriteAnimation/SpriteAnimtaion";
import { Spell } from "../Spell/Base";
import { Target } from '../Target/Target';
import { BaseEntity } from './BaseEntity';
import { FadeIn } from "../Animation/FadeIn";

export class Player extends BaseEntity {
  private spriteAnimation: SpriteAnimation;

  private spellText: Text;
  private healthText: Text;
  private manaText: Text;

  private playerContainer: Container = new Container();
  private learnedSpells: Array<Spell>;
  private fade: FadeIn;

  constructor() {
    super();
  }

  setup(spriteSheet: Spritesheet) {

    this.spellText = new Text();
    this.spellText.style = new TextStyle({
      fontFamily: 'PressStart2P',
      fontSize: 24,
      fill: '#FFFFFF',
      wordWrap: true,
      wordWrapWidth: 600,
    });

    this.healthText = new Text();
    this.manaText = new Text();

    this.healthText.style = new TextStyle({
      fontFamily: 'PressStart2P',
      fontSize: 12,
      fill: '#FFFFFF',
      wordWrap: true,
      wordWrapWidth: 600,
    });

    this.manaText.style = new TextStyle({
      fontFamily: 'PressStart2P',
      fontSize: 12,
      fill: '#FFFFFF',
      wordWrap: true,
      wordWrapWidth: 600,
    });

    this.fade = new FadeIn(this.spellText, 1000);

    this.spriteAnimation = new SpriteAnimation(spriteSheet);
    this.playerContainer.position.set(100, 100)
    this.spriteAnimation.showAnimation("_side idle", true)
  }

  attack(targets?: Array<Target>) {
    this.spriteAnimation
      .showAnimation("_side attack", false)
      .then(() => {
        this.spriteAnimation
          .showAnimation("_side idle", true);
      });
  }

  cast(spell: Spell, targets?: Array<Target>) {
    if (spell.cost >= this.getManaPoints()) {
      this.spriteAnimation
        .showAnimation("_side idle", true);
    } else {
      spell.cast(targets);
      this.fade.reset();
      this.spellText.text = spell.name;
      this.spriteAnimation
        .showAnimation("_side attack", false)
        .then(() => {
          this.spriteAnimation
            .showAnimation("_side idle", true);
        });
    }
  }


  update(app: Application) {
    super.update(app);

    this.manaText.text = this.getManaPoints();
    this.healthText.text = this.getHealthPoints();

    app.ticker.add(() => {
    }, UPDATE_PRIORITY.HIGH);
  }

  draw(container: Container) {
    this.playerContainer.addChild(this.spriteAnimation);
    this.playerContainer.addChild(this.spellText);
    this.playerContainer.addChild(this.manaText);
    this.playerContainer.addChild(this.healthText);
    container.addChild(this.playerContainer);
  }
}