import { Tabs } from "../../components";
// import Settings from './tabs'
import { useState, useEffect } from "react";
import { CardBody, Card } from "reactstrap";
import Information from "./tabs/Information";
import Gameification from "./tabs/Gameification";
import Restrictions from "./tabs/Restrictions";
import Pictures from "./tabs/Pictures";
import Parameters from "./tabs/Parameters";
import SocialMedia from "./tabs/SocialMedia";
import Payment from "./tabs/Payment";
import Messages from "./tabs/Messages";
import Sertificate from "./tabs/Sertificate";
import StyleOptions from "./tabs/StyleOptions";
import { SimulatorAction } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const index = () => {
  const [active, setActive] = useState("Information");
  const [errors, setErrors] = useState();
  const sections = [
    { val: "Information", text: "Информация" },
    { val: "Gameification", text: "Геймификация" },
    { val: "Restrictions", text: "Ограничения" },
    { val: "Pictures", text: "Изображения" },
    { val: "Parameters", text: "Параметры" },
    { val: "SocialMedia", text: "Соц.сети" },
    { val: "Payment", text: "Оплата" },
    { val: "Messages", text: "Письма" },
    { val: "Sertificate", text: "Сертификат" },
    { val: "StyleOptions", text: "Настройки стилей" },
  ];

  const { sim_id } = useParams();

  const [form, setForm] = useState();

  // const myForm = {
  //   name: "",
  //   description: "",
  //   admin_comment_request_price: "",
  //   price: "",
  //   owner_generated_domain: "",
  //   domain: "",
  //   onboarding_name: "",
  //   notifications_url: "",
  //   agreement_url: "",
  //   data_processing_url: "",
  //   simulator_script: "",
  //   onboarding_skip: false,
  //   order_lesson: '',
  //   theory_award: '',
  //   safetext_award: '',
  //   message_award: '',
  //   test_award_correct: '',
  //   test_award_error: '',
  //   question_award_correct: '',
  //   question_award_error: '',
  //   openquestion_award: '',
  //   openquestionexpert_award: '',
  //   questionanswercheck_award_correct: '',
  //   questionanswercheck_award_error: '',
  //   questionuserchoice_award: '',
  //   pause_length:'',
  //   pause_text: '',
  //   vkontakte: '',
  //   telegram: '',
  //   facebook: '',
  //   whatsapp: '',
  //   pay_TerminalKey: '',
  //   pay_EmailCompany: '',
  //   pay_password: '',
  //   group: '',
  //   name1:"",
  //   name2: ''}

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTinyCroppa = (val, name) => {
    console.log('val, name')
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await SimulatorAction.edit({ ...form, simulator: sim_id });
    if (!response.ok) {
      setErrors(await response.json());
    } else {
      setErrors({});
    }
  };

  const simulator = useSelector((state) => state.simulator).curr_simulator;

  useEffect(() => {
    SimulatorAction.details(sim_id);
  }, []);

  useEffect(() => {
    if (simulator.id) setForm(simulator);
  }, [simulator]);

  return (
    <>
      <Card>
        <CardBody className="pt-0">
          <Tabs
            className="mt-2"
            active={active}
            sections={sections}
            onChange={(tab) => setActive(tab)}
          />
          {form &&
            ((active === "Information" && (
              <Information
                form={form}
                changeHandler={handleChange}
                submitHandler={handleSubmit}
                handleTiny={handleTinyCroppa}
              />
            )) ||
              (active === "Gameification" && (
                <Gameification
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                />
              )) ||
              (active === "Restrictions" && (
                <Restrictions
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                  handleTiny={handleTinyCroppa}
                />
              )) ||
              (active === "Pictures" && (
                <Pictures
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                  handleTiny={handleTinyCroppa}
                />
              )) ||
              (active === "Parameters" && (
                <Parameters
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                  handleTiny={handleTinyCroppa}
                />
              )) ||
              (active === "SocialMedia" && (
                <SocialMedia
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                />
              )) ||
              (active === "Payment" && (
                <Payment
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                />
              )) ||
              (active === "Messages" && (
                <Messages
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                />
              )) ||
              (active === "Sertificate" && (
                <Sertificate
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleTinyCroppa}
                  handleTiny={handleTinyCroppa}
                />
              )) ||
              (active === "StyleOptions" && (
                <StyleOptions
                  form={form}
                  changeHandler={handleChange}
                  submitHandler={handleSubmit}
                />
              )))}
        </CardBody>
      </Card>
    </>
  );
};

export default index;
