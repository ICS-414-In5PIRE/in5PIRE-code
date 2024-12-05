import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Surplus = ({ formData, handleChange, canEdit }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Management"
        name="management"
        value={formData.management ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Support Services"
        name="supportServices"
        value={formData.supportServices ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Beneficiary Advocacy"
        name="beneficiaryAdvocacy"
        value={formData.beneficiaryAdvocacy ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        className="dotted-input"
        label="Surplus (Deficit)"
        name="surplusDeficit"
        value={formData.surplusDeficit ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

Surplus.propTypes = {
  formData: PropTypes.shape({
    management: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    supportServices: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    beneficiaryAdvocacy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    surplusDeficit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
  canEdit: PropTypes.bool,
};

Surplus.defaultProps = {
  formData: {},
  handleChange: () => {},
  canEdit: true,
};

export default Surplus;
