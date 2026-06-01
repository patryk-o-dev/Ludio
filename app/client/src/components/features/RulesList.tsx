import useGameConfigStore from "../../store/gameConfigStore";
import RuleElement from "../utils/RuleElement";
import AddNewRule from "./AddNewRule";

const RulesList = () => {
	const rules = useGameConfigStore((state) => state.rules);

	return (
		<div>
			{rules.map((rule, i) => (
				<RuleElement key={rule.index} rule={rule} ruleNumber={i + 1} />
			))}
			<AddNewRule />
		</div>
	);
};

export default RulesList;
