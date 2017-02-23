import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import { div, VNode } from "@cycle/dom";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { Size, SizeString, Color, ColorString, Attachment, AttachmentString, Animation, Direction, IconType } from "../../enums";
import { renderPropsAndContent } from "../../common";

export namespace Message {
  export interface Props {
    icon: boolean;
    floating: boolean;
    compact: boolean;
    attachment: Attachment | AttachmentString;
    size: Size | SizeString;
    color: Color | ColorString;
  }
  export interface Content {
    icon: DOMContent;
    header: DOMContent;
    main: DOMContent;
  }

  export type MessageArgs = StyleAndContentArgs<Props, DOMContent, Content>;

  export interface MessageSources extends ComponentSources<Props, DOMContent, Content> {
    args?: {
      closeable?: true,
      on$?: Stream<boolean>
    };
  }

  export function render(arg1?: Partial<Props> | DOMContent | MessageArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(message, isArgs, isDOMContent, arg1, arg2);
  }

  export function run(sources: MessageSources, scope?: string): ComponentSinks {
    function main(sources: MessageSources) {
      let props$ = sources.props$ ? sources.props$ : xs.of({});
      let content$ = sources.content$ ? sources.content$.map(c => isDOMContent(c) ? { main: c } : c) : xs.of({ main: [] });
      let on$ = sources.args && sources.args.on$ ? sources.args.on$ : xs.of(true);

      let vTree$, active$;
      if (sources.args && sources.args.closeable) {
        const icon = Icon.run({ DOM: sources.DOM, content$: xs.of(IconType.Close) });
        const close$ = icon.events("click").mapTo(false);
        vTree$ = xs.combine(props$, content$, icon.DOM)
          .map(([props, content, closeIcon]) => message({ props, content }, closeIcon));
        active$ = xs.merge(on$, close$);
      } else {
        vTree$ = xs.combine(props$, content$).map(([props, content]) => message({ props, content }));
        active$ = on$;
      }
      const transition$ = active$.fold((prevAnim, active) => prevAnim.direction === Direction.None
        ? { animation: Animation.None, direction: active ? Direction.In : Direction.Out }
        : { animation: Animation.Fade, direction: active ? Direction.In : Direction.Out }
        , { animation: Animation.None, direction: Direction.None });
      const animatedVTree$ = Transition.run({ DOM: sources.DOM, target$: vTree$, transition$ }).DOM;
      return {
        DOM: animatedVTree$,
        events: (type) => sources.DOM.select(".message").events(type)
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function message(args: MessageArgs, closeIcon?: VNode) {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
    closeIcon = closeIcon ? closeIcon : [];
    return div({ props: { className: getClassname(props) } }, [].concat(
      content.icon ? content.icon : [], closeIcon,
      div({ props: { className: "content" } }, [].concat(
        content.header ? div({ props: { className: "header" } }, content.header) : [],
        content.main
      ))
    ));
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.icon) {
      className += " icon";
    }
    if (props.floating) {
      className += " floating";
    }
    if (props.compact) {
      className += " compact";
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " message";
    return className;
  }

  function isArgs(obj): obj is MessageArgs {
    return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" || isContent(obj.content) || isDOMContent(obj.content));
  }

  function isContent(content): content is Content {
    return content !== undefined && (isDOMContent(content.icon) || isDOMContent(content.header) || isDOMContent(content.main));
  }
}
