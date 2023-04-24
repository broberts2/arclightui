import React, { FC } from "react";
import { TextField as _TextField } from "@mui/material";
import Styles from "./styles";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import Checkbox from "../checkbox";
import SearchControls from "../searchcontrols";

export interface PropTypes {
	span?: boolean | null;
	key: number;
	label?: string | null;
	variant: any;
	onChange: Function;
	hot?: boolean;
	value?: string | Array<any>;
	list: Array<{ value: any; text: string }>;
	multiple?: boolean;
	disallowNone?: boolean;
	disableSearch?: boolean;
}

const TextField: FC<PropTypes> = ({
	multiple,
	key,
	label,
	variant,
	span,
	onChange,
	hot,
	value,
	list,
	disallowNone,
	disableSearch,
}) => {
	const [searchFilterValue, setSearchFilterValue] = React.useState<
		string | null
	>(null);
	return (
		<Styles.Container span={span}>
			<FormControl
				variant={variant}
				style={{ width: "100%", textAlign: "left" }}
			>
				<InputLabel
					style={{
						color: "inherit",
						fontFamily: "inherit",
						width: "100%",
					}}
				>
					{label}
				</InputLabel>
				<Select
					multiple={multiple}
					value={value}
					renderValue={() => {
						if (
							list &&
							Array.isArray(list) &&
							value !== undefined &&
							value !== null
						) {
							if (Array.isArray(value)) {
								return list
									.filter((el: { text: string; value: any }) =>
										value.some((_: any) => _ === el.value)
									)
									.map((el: { text: string }) => el.text)
									.join(", ");
							} else {
								const obj = list.find(
									(el: { text: string; value: any }) => value === el.value
								);
								if (obj && obj.text) return obj.text;
							}
						}
						return null;
					}}
					onChange={(d: any) => (hot ? onChange(d) : null)}
					onBlur={(d: any) => (!hot ? onChange(d) : null)}
					style={{
						color: "inherit",
						fontFamily: "inherit",
						width: "100%",
					}}
					MenuProps={{
						sx: {
							"& .MuiPaper-root": {
								//backgroundColor: tw`bg-background-secondary`,
							},
							"&& .Mui-selected": {
								//backgroundColor: "pink",
							},
						},
					}}
				>
					{!disableSearch && list.length > 10 ? (
						<SearchControls
							hot
							constrain={true}
							textField={{
								label: "Search",
								value: searchFilterValue ? searchFilterValue : undefined,
							}}
							className={`mx-4`}
							onChange={(d: { [key: string]: any }) =>
								setSearchFilterValue(d.target.value)
							}
						>
							<div />
						</SearchControls>
					) : null}
					{!multiple && !disallowNone ? (
						<MenuItem value="" sx={{ backgroundColor: "transparent" }}>
							<div className={`text-text-primary font-primary`}>
								<em>None</em>
							</div>
						</MenuItem>
					) : null}
					{list
						? list
								.filter((el: { value: any; text: string }) => {
									const _ = searchFilterValue;
									if (!_) return true;
									else if (searchFilterValue && !searchFilterValue.length)
										return true;
									else if (
										searchFilterValue &&
										el.text.includes(searchFilterValue)
									)
										return false;
								})
								.map((el: { value: any; text: string }) => (
									<MenuItem
										value={el.value}
										sx={{ backgroundColor: "transparent" }}
									>
										<div className={`text-text-primary font-primary`}>
											{multiple ? (
												<table>
													<tbody>
														<tr>
															<td>
																<Checkbox
																	value={
																		value && Array.isArray(value)
																			? value.some(
																					(val: any) => val === el.value
																			  )
																			: false
																	}
																/>
															</td>
															{multiple ? <td>{el.text}</td> : null}
														</tr>
													</tbody>
												</table>
											) : (
												el.text
											)}
										</div>
									</MenuItem>
								))
						: null}
				</Select>
			</FormControl>
		</Styles.Container>
	);
};

export default TextField;
