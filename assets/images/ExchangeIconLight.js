import React from "react";
import Svg, { G, Path } from "react-native-svg";

const ExchangeIconLight = props => {
  const { width, height, start, end, offsets, colors, ...others } = props;
  let ratio = 1;
  if (width && height) {
    ratio = Math.min(width / 44, height / 36);
  } else if (width) {
    ratio = width / 44;
  } else if (height) {
    ratio = height / 36;
  }
  return (
    <Svg width={44 * ratio} height={36 * ratio} {...others}>
      <G data-name="Group 2318" scale={ratio}>
        <Path
          data-name="Path 1695"
          d="M16.857 26.394a1.99 1.99 0 0 0-.788-.865 3.083 3.083 0 0 0-2.15-.561.736.736 0 0 1-.3.263 1.97 1.97 0 0 1-.29.911l-1 1.77a1.849 1.849 0 0 1-.389.593 1.568 1.568 0 0 0 .884 1.659c1.081.667 1.568.573 1.691.525.021-.007.029-.021.046-.031a.718.718 0 0 1 .118-.087l.035-.046a.684.684 0 0 1 .047-.085.906.906 0 0 1 .033-.091l2.084-3.37a.68.68 0 0 0-.021-.585z"
          fill="#f1f1f1"
        />
        <Path
          data-name="Path 1696"
          d="M20.311 28.659a3.857 3.857 0 0 0-2.184-.742c0 .008-.013.012-.019.019l-1.967 3.182a1.951 1.951 0 0 1-.268.434 2.371 2.371 0 0 0 1.189 1.739c1.082.669 1.568.572 1.691.528a.4.4 0 0 0 .2-.164.69.69 0 0 1 .047-.085.683.683 0 0 1 .033-.091l2.084-3.37a.548.548 0 0 0 .04-.411 1.84 1.84 0 0 0-.846-1.039z"
          fill="#f1f1f1"
        />
        <Path
          data-name="Path 1697"
          d="M11.201 23.875a2.02 2.02 0 0 0-1.034-.32.749.749 0 0 0-.622.247l-1.032 1.825a.649.649 0 0 1-.052.081.818.818 0 0 0-.116.556 1.335 1.335 0 0 0 .647.725 2.968 2.968 0 0 0 1.465.562c.345 0 .424-.2.424-.2a.791.791 0 0 1 .064-.148l1.047-1.851c.216-.348-.086-1.039-.791-1.477z"
          fill="#f1f1f1"
        />
        <Path
          data-name="Path 1698"
          d="M10.36 4.969l-8.5 14.767 2.582 1.311 8.5-14.767z"
          fill="#075aaa"
        />
        <Path
          data-name="Path 1699"
          d="M28.081 5.969l-11.223 8.005a1.449 1.449 0 0 0-.309 2.019 1.451 1.451 0 0 0 2.026.316l4.771-3.2a.785.785 0 0 1 .735-.07l8.856 3.759a3.047 3.047 0 0 1 1.594 2.023 4.2 4.2 0 0 0 2.1-2.785L28.262 5.762a.737.737 0 0 1-.181.207z"
          fill="#f1f1f1"
        />
        <Path
          data-name="Path 1700"
          d="M32.284 18.211l-8.422-3.573-4.4 2.944a3 3 0 0 1-3.514-4.865l2.392-1.707-4.654-2.4a.772.772 0 0 1-.2-.163l-6.628 11.51a.8.8 0 0 1 .043.188 5.326 5.326 0 0 0 1.205 3.052l.1-.183a2.206 2.206 0 0 1 1.957-1.01 3.584 3.584 0 0 1 1.852.553 3.656 3.656 0 0 1 1.126 1.088c.993-.576 2.665-.1 3.74.566a3.515 3.515 0 0 1 1.4 1.582 2.621 2.621 0 0 1 .164.574 6.19 6.19 0 0 1 2.675.974 3.331 3.331 0 0 1 1.54 2 2.076 2.076 0 0 1-.23 1.584l-.261.422 2.741 1.345a1.45 1.45 0 1 0 1.32-2.581l-2.345-1.278a.776.776 0 0 1 .744-1.362l2.326 1.269a1.447 1.447 0 0 0 1.928-.645 1.455 1.455 0 0 0-.636-1.951l-4.958-2.518a.776.776 0 0 1 .7-1.385l4.959 2.517a1.446 1.446 0 0 0 1.947-.642 1.466 1.466 0 0 0-.636-1.962l-4.958-2.54a.826.826 0 0 1-.341-1.086.815.815 0 0 1 1.043-.428l3.965 1.838.991.679a1.527 1.527 0 0 0 1.108.263 1.434 1.434 0 0 0 .841-.722 1.453 1.453 0 0 0-.624-1.947z"
          fill="#fff"
        />
        <Path
          data-name="Path 1701"
          d="M28.455 3.543l10.761 13.211 2.339-1.708L30.793 1.837z"
          fill="#075aaa"
        />
        <Path
          data-name="Path 1702"
          d="M31.531.286a.775.775 0 0 0-1.059-.137L26.88 2.772a.776.776 0 0 0-.143 1.117l.607.745a.743.743 0 0 0-.163.071l-7.418 5.292L14.4 7.229a.755.755 0 0 0-.185-.052l.479-.832a.776.776 0 0 0-.32-1.079l-3.967-2.015a.776.776 0 0 0-1.024.3L.105 19.664a.777.777 0 0 0 .321 1.079l3.967 2.015a.776.776 0 0 0 1.023-.3l.273-.473a7.947 7.947 0 0 0 1.6 2.656l-.109.192a2.371 2.371 0 0 0-.359 1.713 2.691 2.691 0 0 0 1.357 1.762 4.492 4.492 0 0 0 2.214.789 3.224 3.224 0 0 0 1.615 2.387 4.486 4.486 0 0 0 2.284.792c.051 0 .1-.009.15-.012a3.925 3.925 0 0 0 1.807 2.347 4.5 4.5 0 0 0 2.286.8 2.18 2.18 0 0 0 .762-.132 1.907 1.907 0 0 0 1.089-1.028l.972-1.572 2.868 1.408a2.989 2.989 0 0 0 4.148-3.751c.052-.014.106-.022.158-.038a2.985 2.985 0 0 0 1.856-3.931c.052-.013.1-.021.157-.037a2.983 2.983 0 0 0 1.857-3.93c.054-.014.109-.021.161-.039a2.812 2.812 0 0 0 1.889-1.874 4.973 4.973 0 0 0 3.315-3.053l.713.875a.778.778 0 0 0 .6.285.768.768 0 0 0 .456-.15l3.594-2.624a.775.775 0 0 0 .144-1.117zM4.437 21.047l-2.582-1.311 8.5-14.767 2.582 1.311zm6.508 6.158a.791.791 0 0 0-.064.148s-.079.2-.424.2a2.968 2.968 0 0 1-1.465-.562 1.335 1.335 0 0 1-.647-.725.818.818 0 0 1 .116-.556.649.649 0 0 0 .052-.081l1.032-1.825a.749.749 0 0 1 .622-.247 2.02 2.02 0 0 1 1.034.32c.705.438 1.008 1.127.792 1.479zm3.846 3.146a.905.905 0 0 0-.033.091.684.684 0 0 0-.047.085l-.035.046a.72.72 0 0 0-.118.087c-.017.01-.025.024-.046.031-.123.047-.61.142-1.691-.525a1.568 1.568 0 0 1-.884-1.659 1.849 1.849 0 0 0 .389-.593l1-1.77a1.97 1.97 0 0 0 .29-.911.736.736 0 0 0 .3-.263 3.083 3.083 0 0 1 2.15.561 1.99 1.99 0 0 1 .788.865.68.68 0 0 1 .019.586zm6.325-.242l-2.084 3.37a.683.683 0 0 0-.033.091.692.692 0 0 0-.047.085.4.4 0 0 1-.2.164c-.123.043-.609.141-1.691-.528a2.371 2.371 0 0 1-1.189-1.739 1.952 1.952 0 0 0 .268-.434l1.967-3.182c.005-.008.014-.012.019-.019a3.857 3.857 0 0 1 2.184.742 1.84 1.84 0 0 1 .846 1.039.548.548 0 0 1-.039.411zm11.8-9.949a1.434 1.434 0 0 1-.841.722 1.527 1.527 0 0 1-1.108-.263l-4.958-2.517a.815.815 0 0 0-1.043.428.826.826 0 0 0 .341 1.086l4.958 2.54a1.466 1.466 0 0 1 .636 1.962 1.446 1.446 0 0 1-1.947.642l-4.959-2.517a.776.776 0 0 0-.7 1.385l4.958 2.518a1.451 1.451 0 0 1-.206 2.672 1.432 1.432 0 0 1-1.087-.077l-2.326-1.269a.776.776 0 0 0-.744 1.362l2.345 1.278a1.45 1.45 0 1 1-1.32 2.581l-2.741-1.345.261-.422a2.076 2.076 0 0 0 .23-1.584 3.331 3.331 0 0 0-1.54-2 6.19 6.19 0 0 0-2.675-.974 2.621 2.621 0 0 0-.164-.574 3.515 3.515 0 0 0-1.4-1.582c-1.074-.665-2.747-1.143-3.74-.566a3.656 3.656 0 0 0-1.126-1.088 3.584 3.584 0 0 0-1.852-.553 2.206 2.206 0 0 0-1.957 1.01l-.1.183a5.326 5.326 0 0 1-1.205-3.052.8.8 0 0 0-.043-.188l6.628-11.51a.772.772 0 0 0 .2.163l4.654 2.4-2.392 1.707a3 3 0 0 0 3.514 4.865l4.4-2.944 8.422 3.573a1.453 1.453 0 0 1 .632 1.948zm1.611-1.333a3.046 3.046 0 0 0-1.594-2.023l-8.856-3.759a.785.785 0 0 0-.735.07l-4.771 3.2a1.451 1.451 0 0 1-2.026-.316 1.449 1.449 0 0 1 .309-2.019l11.223-8.005a.736.736 0 0 0 .186-.2l8.369 10.274a4.2 4.2 0 0 1-2.1 2.779zm4.684-2.074L28.456 3.543l2.338-1.706 10.762 13.209z"
          fill="#b1b9c2"
        />
      </G>
      <Path
        data-name="Path 1703"
        d="M12.941 6.277l-2.582-1.311-2.895 5.026 2.609 1.264z"
        fill="#fff"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1704"
        d="M30.793 1.837l-2.338 1.706 2.994 3.676 2.323-1.727z"
        fill="#fff"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1705"
        d="M22.564 30.67l.261-.422a2.075 2.075 0 0 0 .23-1.584 3.331 3.331 0 0 0-1.54-2 6.19 6.19 0 0 0-2.675-.974 2.619 2.619 0 0 0-.164-.574 3.514 3.514 0 0 0-1.4-1.582c-1.074-.665-2.747-1.143-3.74-.566a3.656 3.656 0 0 0-1.126-1.088 3.584 3.584 0 0 0-1.852-.553 2.205 2.205 0 0 0-1.957 1.01l-.492.862.1-.183a2.206 2.206 0 0 1 1.957-1.01 3.584 3.584 0 0 1 1.852.553 3.656 3.656 0 0 1 1.126 1.088c.993-.576 2.665-.1 3.74.566a3.515 3.515 0 0 1 1.4 1.582 2.621 2.621 0 0 1 .164.574 6.19 6.19 0 0 1 2.675.974 3.331 3.331 0 0 1 1.54 2"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1706"
        d="M20.983 17.582l3.809-2.549-.931-.395-4.4 2.944a2.887 2.887 0 0 1-.967.452 2.952 2.952 0 0 0 2.489-.452z"
        opacity={0.1}
        scale={ratio}
      />
      <Path
        data-name="Path 1707"
        d="M30.083 9.533a8.192 8.192 0 0 1 1.347.12l-3.163-3.884a.737.737 0 0 1-.186.2l-11.223 8.005a1.449 1.449 0 0 0-.309 2.019 1.451 1.451 0 0 0 2.026.316l4.722-3.162a8.169 8.169 0 0 1 6.786-3.614z"
        fill="#fff"
        opacity={0.6}
        scale={ratio}
      />
    </Svg>
  );
};

export default ExchangeIconLight;
