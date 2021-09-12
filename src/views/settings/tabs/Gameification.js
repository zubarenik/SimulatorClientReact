import { Form, Button, FormGroup } from "reactstrap";
import { RadioInput, Input } from "../../../components";
const Gameification = ({ submitHandler, changeHandler, form }) => {
  return (
    <Form
      className="auth-login-form mt-2"
      onSubmit={submitHandler}
      onChange={changeHandler}
    >
      <RadioInput
        name="name"
        id="name"
        label="Показывать магазин?"
        variants={[
          { label: "Да", value: true },
          { label: "Нет", value: false },
        ]}
        className="mb-2"
      />
      <FormGroup>
        <Input
          name="theory_award"
          id="theory_award"
          label="Награда за Теорию"
          placeholder="0"
          className="mb-2"
          value={form.theory_award}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="safetext_award"
          id="safetext_award"
          label="Награда за SafeText"
          placeholder="0"
          className="mb-2"
          value={form.safetext_award}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="message_award"
          id="message_award"
          label="Награда за сообщение"
          placeholder="0"
          className="mb-2"
          value={form.message_award}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="test_award_correct"
          id="test_award_correct"
          label="Награда за тестовый вопрос верный"
          placeholder="0"
          className="mb-2"
          value={form.test_award_correct}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="test_award_error"
          id="test_award_error"
          label="Награда за тестовый вопрос неверный"
          placeholder="0"
          className="mb-2"
          value={form.test_award_error}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="question_award_correct"
          id="question_award_correct"
          label="Награда за закрытый вопрос верный"
          placeholder="0"
          className="mb-2"
          value={form.question_award_correct}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="question_award_error"
          id="question_award_error"
          label="Награда за закрытый вопрос неверный"
          placeholder="0"
          className="mb-2"
          value={form.question_award_error}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="openquestion_award"
          id="openquestion_award"
          label="Награда за открытый вопрос"
          placeholder="0"
          className="mb-2"
          value={form.openquestion_award}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="openquestionexpert_award"
          id="openquestionexpert_award"
          label="Награда за открытый вопрос эксперт"
          placeholder="0"
          className="mb-2"
          value={form.openquestionexpert_award}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="questionanswercheck_award_correct"
          id="questionanswercheck_award_correct"
          label="Награда за вопрос с проверкой значения верно"
          placeholder="0"
          className="mb-2"
          value={form.questionanswercheck_award_correct}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="questionanswercheck_award_error"
          id="questionanswercheck_award_error"
          label="Награда за вопрос с проверкой значения неверно"
          placeholder="0"
          className="mb-2"
          value={form.questionanswercheck_award_error}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="questionuserchoice_award"
          id="questionuserchoice_award"
          label="Награда за выбор пользователя"
          placeholder="0"
          className="mb-2"
          value={form.questionuserchoice_award}
        />
      </FormGroup>

      <Button color="primary" type="submit" className="mt-2">
        Изменить
      </Button>
    </Form>
  );
};

export default Gameification;
