import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../../utils/schemas';
import Button from 'react-bootstrap/Button';

const SignUp = ({ onSubmit = () => {} }) => {
  const {
    register,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(signUpSchema),
    mode: 'all',
    validateCriteriaMode: 'all'
  });

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(getValues());
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Github Username</Form.Label>
        <Form.Control type="text" placeholder="Octocat" {...register('username')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Github123" {...register('password')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Github123" {...register('confirmPassword')} />
      </Form.Group>

      {_.size(errors) > 0 && (
        <Form.Group className="mb-3">
          <Form.Text className="text-muted">{_.values(errors)[0].message}</Form.Text>
        </Form.Group>
      )}

      <div className="d-grid gap-2">
        <Button type="submit" variant="primary" disabled={!isValid} size="lg">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
