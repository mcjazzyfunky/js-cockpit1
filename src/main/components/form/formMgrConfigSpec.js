import { Spec } from 'js-spec';

export default
  Spec.shape({
    fields:
      Spec.arrayOf(
        Spec.shape({
          name:
            Spec.match(/[a-zA-Z][a-zA-Z0-9_-]/),
          rules:
            Spec.arrayOf(
              Spec.shape({
                condition: Spec.function,
                errorMsg: Spec.string
              }))
        })
      )
  });
  