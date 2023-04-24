import React, { FC } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Styles from "./styles";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface PropTypes {}

const Layout: FC<PropTypes> = ({}) => {
	return (
		<Styles.Container>
			<ResponsiveGridLayout
				className="layout"
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				cols={{ lg: 12, md: 10, sm: 6, xs: 2, xxs: 1 }}
			>
				<div key="1" style={{ backgroundColor: "blue" }}>
					1
				</div>
				<div key="2" style={{ backgroundColor: "red" }}>
					2
				</div>
				<div key="3" style={{ backgroundColor: "purple" }}>
					3
				</div>
			</ResponsiveGridLayout>
		</Styles.Container>
	);
};

export default Layout;
