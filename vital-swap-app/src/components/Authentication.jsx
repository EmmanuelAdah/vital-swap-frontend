import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiox from 'axios'

const AuthenticationFlow = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot', 'verify'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    verificationCode: ''
  });

  // Check if screen is desktop size (640px and above)
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email: formData.email, password: formData.password });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Send reset email to:', formData.email);
    setCurrentView('verify');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    console.log('Verify code:', formData.verificationCode);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background decoration */}
      <div style={styles.backgroundPattern}></div>
      <div style={styles.backgroundGradient}></div>

      <AnimatePresence mode="wait">
        {currentView === 'login' && (
          <motion.div
            key="login"
            style={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              style={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back
              </motion.h2>

              <form onSubmit={handleLogin} style={styles.form}>
                <motion.div
                  style={styles.inputGroup}
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>

                <motion.div
                  style={styles.inputGroup}
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </motion.div>

                <motion.div
                  style={styles.linkContainer}
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentView('forgot')}
                    style={styles.link}
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.button
                  type="submit"
                  style={styles.submitButton}
                  custom={3}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>

                <motion.div
                  style={styles.registerPrompt}
                  custom={4}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentView('register')}
                    style={styles.linkBold}
                  >
                    Register here
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {currentView === 'register' && (
          <motion.div
            key="register"
            style={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              style={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Create Account
              </motion.h2>

              <form onSubmit={handleRegister} style={styles.form}>
                <motion.div
                  style={isDesktop ? styles.nameRowDesktop : styles.nameRow}
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div style={styles.halfInput}>
                    <label style={styles.label}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div style={styles.halfInput}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  style={styles.inputGroup}
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>

                <motion.div
                  style={styles.inputGroup}
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Role</label>
                  <div style={isDesktop ? styles.roleContainerDesktop : styles.roleContainer}>
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === 'admin'}
                        onChange={handleInputChange}
                        style={styles.radio}
                      />
                      <span style={styles.radioText}>Admin</span>
                    </label>
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === 'user'}
                        onChange={handleInputChange}
                        style={styles.radio}
                      />
                      <span style={styles.radioText}>User</span>
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  style={styles.inputGroup}
                  custom={3}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </motion.div>

                <motion.div
                  style={styles.inputGroup}
                  custom={4}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  style={styles.submitButton}
                  custom={5}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Account
                </motion.button>

                <motion.div
                  style={styles.registerPrompt}
                  custom={6}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentView('login')}
                    style={styles.linkBold}
                  >
                    Sign in
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {currentView === 'forgot' && (
          <motion.div
            key="forgot"
            style={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              style={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Reset Password
              </motion.h2>

              <motion.p
                style={styles.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Enter your email address and we'll send you a verification code
              </motion.p>

              <form onSubmit={handleForgotPassword} style={styles.form}>
                <motion.div
                  style={styles.inputGroup}
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  style={styles.submitButton}
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Verification Code
                </motion.button>

                <motion.div
                  style={styles.registerPrompt}
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentView('login')}
                    style={styles.linkBold}
                  >
                    Sign in
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {currentView === 'verify' && (
          <motion.div
            key="verify"
            style={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              style={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2
                style={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Verify Your Email
              </motion.h2>

              <motion.p
                style={styles.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We've sent a verification code to {formData.email}
              </motion.p>

              <form onSubmit={handleVerifyCode} style={styles.form}>
                <motion.div
                  style={styles.inputGroup}
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label style={styles.label}>Verification Code</label>
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    style={{...styles.input, textAlign: 'center', fontSize: '24px', letterSpacing: '8px'}}
                    placeholder="• • • • • •"
                    maxLength="6"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  style={styles.submitButton}
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Verify Code
                </motion.button>

                <motion.div
                  style={styles.registerPrompt}
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={() => console.log('Resend code')}
                    style={styles.linkBold}
                  >
                    Resend
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.03) 1px, transparent 0)`,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  backgroundGradient: {
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  modal: {
    background: 'rgba(30, 27, 50, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px 24px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    position: 'relative',
    margin: 'auto',
    maxHeight: '90vh',
    overflowY: 'auto',
    '@media (min-width: 640px)': {
      padding: '48px',
      maxHeight: 'none',
      overflowY: 'visible',
    },
  },
  title: {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '8px',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  },
  description: {
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: '24px',
    lineHeight: '1.6',
    padding: '0 8px',
  },
  form: {
    marginTop: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: 'clamp(12px, 2.2vw, 13px)',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '8px',
    letterSpacing: '0.3px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: 'clamp(14px, 2.5vw, 15px)',
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  },
  nameRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
  },
  nameRowDesktop: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    marginBottom: '20px',
  },
  halfInput: {
    flex: 1,
    minWidth: 0,
  },
  roleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '12px 0',
  },
  roleContainerDesktop: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    padding: '12px 0',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1,
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    minHeight: '48px',
  },
  radio: {
    marginRight: '10px',
    cursor: 'pointer',
    accentColor: '#7c3aed',
    width: '18px',
    height: '18px',
    flexShrink: 0,
  },
  radioText: {
    fontSize: 'clamp(14px, 2.5vw, 15px)',
    color: '#ffffff',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    padding: '14px 16px',
    fontSize: 'clamp(15px, 2.5vw, 16px)',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
    letterSpacing: '0.3px',
    minHeight: '48px',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
    padding: '4px 0',
  },
  link: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 'clamp(13px, 2.2vw, 14px)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    padding: '8px 4px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  },
  registerPrompt: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: 'clamp(13px, 2.2vw, 14px)',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.6',
    padding: '8px 0',
  },
  linkBold: {
    background: 'none',
    border: 'none',
    color: '#a855f7',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    padding: '4px 0',
    display: 'inline',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  },
};

// Media query hook for responsive behavior
const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export default AuthenticationFlow;