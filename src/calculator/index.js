import Button from "../components/Button";
import ScreenCalculator from "../screen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import "./calculator.css";
import { useState, useEffect } from "react";

function Calculator() {
    const [currentValue, setCurrentValue] = useState("0");
    const [checkLastIndexIsDecimal, setCheckLastIndexIsDecimal] = useState(false);
    const [preValue, setPreValue] = useState(currentValue);
    const [statusCalculator, setStatusCalculator] = useState("add");
    const [statusDecimal, setStatusDecimal] = useState(false);
    const bColor = "#B3B4B3";
    const txtColor = "#fff";
    const valueNumberButtons = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];
    const valueCalculateButtons = [
        { calculate: "+", name: "add" },
        { calculate: "-", name: "sub" },
        { calculate: "x", name: "mul" },
        { calculate: "/", name: "div" },
    ];

    useEffect(() => {
        if(currentValue[currentValue.length-1] === '.') {
            setCheckLastIndexIsDecimal(true)            
        } else {
            setCheckLastIndexIsDecimal(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue]);

    const parseNumber = (value) => {
        try {
            let n = parseFloat(currentValue + value)
            // check if n is a number
            if (!isNaN(n)) {
                setCurrentValue(n.toString())
            }
        } catch (e) {
            console.log("Looix: ", e)
        }
    }

    const renderNumberButton = () => {
        return valueNumberButtons.map((value, index) => {
            return (
                <Button
                    key={index}
                    colorb={bColor}
                    textColor={txtColor}
                    onclick={() => eventInputValue(value)}
                    number={value}
                />
            );
        });
    };

    const renderCalculateButton = () => {
        return valueCalculateButtons.map((value, index) => {
            return (
                <Button
                    key={index}
                    colorb={bColor}
                    textColor={txtColor}
                    onclick={checkLastIndexIsDecimal ? () => {} : () => eventCalculate(value.name)}
                    // onclick={() => eventCalculate(value.name)}
                    number={value.calculate}
                />
            );
        });
    };

    const eventCEButton = () => {
        setCurrentValue("0");
        setPreValue("0");
        setStatusCalculator("add");
        setStatusDecimal(false)
    };

    const eventInputValue = (inputValue) => {
        if (inputValue === '.') {
            setStatusDecimal(true)
            setCurrentValue(currentValue + inputValue)
        }
        else {
            parseNumber(inputValue)
        }
    };

    const eventCalculate = (value) => {
        setPreValue(currentValue)
        setStatusCalculator(value);
        setCurrentValue('0')
        setStatusDecimal(false)
    };

    const eventEqualButton = () => {
        calculateTwoNumber(parseFloat(preValue), parseFloat(currentValue));
    }

    const calculateTwoNumber = (a, b) => {
        console.log(statusCalculator)
        let showCalculate = '';
        let result = 0;
        if (statusCalculator === 'add') {
            result = (a + b)
            showCalculate = `${a.toString()} + ${b.toString()} = `

        } else if (statusCalculator === 'sub') {
            result = (parseFloat(preValue) - parseFloat(currentValue))
            showCalculate = `${preValue} - ${currentValue} = `

        } else if (statusCalculator === 'mul') {
            result = (parseFloat(preValue) * parseFloat(currentValue))
            showCalculate = `${preValue} x ${currentValue} = `

        } else if (statusCalculator === 'div') {
            result = (parseFloat(preValue) / parseFloat(currentValue))
            showCalculate = `${preValue} / ${currentValue} = `
        }
        setPreValue(showCalculate);
        setCurrentValue(result.toFixed(5))
    }
        


    const deleteChar = () => {
        if(currentValue.lastIndexOf('.') !== -1) {
            setCurrentValue(currentValue.slice(0, currentValue.length - 1))
            setStatusDecimal(false)
        }
        if (currentValue.length === 1) {
            setCurrentValue("0")
        } else {
            setCurrentValue(currentValue.slice(0, currentValue.length - 1))
        }
    }

    return (
        <div id="app">
            <div id="main">
                <ScreenCalculator saveValue={preValue} value={currentValue} />
                <div className="body">
                    <div className="header-button">
                        <Button
                            colorb={bColor}
                            textColor={txtColor}
                            onclick={deleteChar}
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Button>
                        <Button
                            colorb="#F33636"
                            textColor={txtColor}
                            onclick={eventCEButton}
                            number={"ce"}
                        />
                    </div>
                    <div className="body-button">
                        <div className="number-button">
                            {renderNumberButton()}
                            <Button
                                colorb={bColor}
                                textColor={txtColor}
                                onclick={statusDecimal ?  () => { } : () => eventInputValue(".") }
                                number={"."}
                            />
                            <Button
                                colorb={bColor}
                                textColor={txtColor}
                                onclick={checkLastIndexIsDecimal ? () => {} : eventEqualButton}
                                number={"="}
                            />
                        </div>
                        <div className="calculate-button">{renderCalculateButton()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
