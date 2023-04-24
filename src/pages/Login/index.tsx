import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, AuthPage } from "../../components";

const Staff: FC<{
	fns: {
		[key: string]: any;
	};
	D: { [key: string]: any };
	endpoint?: string;
}> = ({ fns, D, endpoint }) => {
	return (
		<Page
			fns={fns}
			backgroundImage={{
				src: "http://localhost:7000/static/media/yone2.jpg",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<AuthPage
				redirect={"/"}
				disableNewRegistration
				fns={fns}
				authBackgroundImage={"http://localhost:7000/static/media/ionia.jpg"}
				OATHOnly={false}
				OATH={[{ type: "discord", onClick: () => null }]}
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Staff;
