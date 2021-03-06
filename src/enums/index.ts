import { capitalize } from "../utils";
export * from "./iconType";


export enum Size {
  Mini, Tiny, Small, Medium, Large, Big, Huge, Massive, Fluid
}

export namespace Size {
  export function ToEnum(sizeOrString: Size | string): Size {
    return typeof (sizeOrString) === "number"
      ? sizeOrString
      : Size[capitalize(sizeOrString)];
  }
  export function ToClassname(size: Size | string) {
    size = ToEnum(size);
    switch (size) {
      case Size.Mini: return " mini";
      case Size.Tiny: return " tiny";
      case Size.Small: return " small";
      case Size.Medium: return " medium";
      case Size.Large: return " large";
      case Size.Big: return " big";
      case Size.Huge: return " huge";
      case Size.Massive: return " massive";
      case Size.Fluid: return " fluid";
      default: return "";
    }
  }
}

export enum VerticalAlignment {
  Top, Middle, Bottom
}

export namespace VerticalAlignment {
  export function ToEnum(vAlignmentOrString: VerticalAlignment | string): VerticalAlignment {
    return typeof (vAlignmentOrString) === "number"
      ? vAlignmentOrString
      : VerticalAlignment[capitalize(vAlignmentOrString)];
  }
  export function ToClassname(alignment: VerticalAlignment | string): string {
    alignment = VerticalAlignment.ToEnum(alignment);
    switch (alignment) {
      case VerticalAlignment.Top: return " top aligned";
      case VerticalAlignment.Middle: return " middle aligned";
      case VerticalAlignment.Bottom: return " bottom aligned";
      default: return "";
    }
  }
}

export enum TextAlignment {
  Left, Right, Center, Justified
}

export namespace TextAlignment {
  export function ToEnum(tAlignmentOrString: TextAlignment | string): TextAlignment {
    return typeof (tAlignmentOrString) === "number"
      ? tAlignmentOrString
      : TextAlignment[capitalize(tAlignmentOrString)];
  }
  export function ToClassname(alignment: TextAlignment | string): string {
    alignment = TextAlignment.ToEnum(alignment);
    switch (alignment) {
      case TextAlignment.Left: return " left aligned";
      case TextAlignment.Right: return " right aligned";
      case TextAlignment.Center: return " center aligned";
      case TextAlignment.Justified: return " justified";
      default: return "";
    }
  }
}

export enum Float {
  None, Right, Left
}

export namespace Float {
  export function ToEnum(floatOrString: Float | string): Float {
    return typeof (floatOrString) === "number"
      ? floatOrString
      : Float[capitalize(floatOrString)];
  }
  export function ToClassname(float: Float | string): string {
    float = Float.ToEnum(float);
    switch (float) {
      case Float.Left: return " left floated";
      case Float.Right: return " right floated";
      default: return "";
    }
  }
}

export enum Attachment {
  None, Top, Bottom
}

export namespace Attachment {
  export function ToEnum(attachmentOrString: Attachment | string): Attachment {
    return typeof (attachmentOrString) === "number"
      ? attachmentOrString
      : Attachment[capitalize(attachmentOrString)];
  }
  export function ToClassname(attachment: Attachment | string): string {
    attachment = Attachment.ToEnum(attachment);
    switch (attachment) {
      case Attachment.None: return " attached";
      case Attachment.Top: return " top attached";
      case Attachment.Bottom: return " bottom attached";
      default: return "";
    }
  }
}

export enum Color {
  None, Primary, Secondary, Success, Info, Warning, Error
}

export namespace Color {
  export function ToEnum(colorOrString: Color | string): Color {
    return typeof (colorOrString) === "number"
      ? colorOrString
      : Color[capitalize(colorOrString)];
  }
  export function ToClassname(color: Color | string): string {
    color = Color.ToEnum(color);
    switch (color) {
      case Color.Primary: return " primaryColored";
      case Color.Secondary: return " secondaryColored";
      case Color.Success: return " successColored";
      case Color.Info: return " infoColored";
      case Color.Warning: return " warningColored";
      case Color.Error: return " errorColored ";
      default: return "";
    }
  }
}

export enum Animation {
  Browse, Drop, Fade, Flip, Scale, Fly, Slide, Swing,
  Flash, Shake, Bounce, Tada, Pulse, Jiggle,
  None
}
export namespace Animation {
  export function ToEnum(animationOrString: Animation | string): Animation {
    return typeof (animationOrString) === "number"
      ? animationOrString
      : Animation[capitalize(animationOrString)];
  }
  export function ToClassname(anim: Animation | string): string {
    anim = Animation.ToEnum(anim);
    switch (anim) {
      case Animation.Browse: return " browse";
      case Animation.Drop: return " drop";
      case Animation.Fade: return " fade";
      case Animation.Flip: return " flip";
      case Animation.Scale: return " scale";
      case Animation.Fly: return " fly";
      case Animation.Slide: return " slide";
      case Animation.Swing: return " swing";
      case Animation.Flash: return " flash";
      case Animation.Shake: return " shake";
      case Animation.Bounce: return " bounce";
      case Animation.Tada: return " tada";
      case Animation.Pulse: return " pulse";
      case Animation.Jiggle: return " jiggle";
    }
  }
  const staticAnimations = [Animation.Flash, Animation.Shake,
  Animation.Bounce, Animation.Tada, Animation.Pulse, Animation.Jiggle];
  export function isStatic(anim: Animation|string): Boolean {
    return staticAnimations.indexOf(Animation.ToEnum(anim)) !== -1;
  }
  const directionAnimations = [Animation.Browse, Animation.Fade,
  Animation.Fly, Animation.Slide, Animation.Swing];
  export function isDirectional(anim: Animation|string): Boolean {
    return directionAnimations.indexOf(Animation.ToEnum(anim)) !== -1;
  }
}

export enum Direction {
  In, Out, None
}
export namespace Direction {
  export function ToEnum(directionOrString: Direction | string): Direction {
    return typeof (directionOrString) === "number"
      ? directionOrString
      : Direction[capitalize(directionOrString)];
  }
  export function ToClassname(direction: Direction | string) {
    direction = Direction.ToEnum(direction);
    return direction === Direction.In ? " in" : " out";
  }
}

export enum AnimationDirection {
  Up, Down, Left, Right
}
export namespace AnimationDirection {
  export function ToEnum(animationDirectionOrString: AnimationDirection | string): AnimationDirection {
    return typeof(animationDirectionOrString) === "number"
      ? animationDirectionOrString
      : AnimationDirection[capitalize(animationDirectionOrString)];
  }
  export function ToClassname(dir: AnimationDirection|string) : string {
    dir = AnimationDirection.ToEnum(dir);
    switch (dir) {
      case AnimationDirection.Up: return " up";
      case AnimationDirection.Down: return " down";
      case AnimationDirection.Left: return " left";
      case AnimationDirection.Right: return " right";
      default: return "";
    }
  }
}
